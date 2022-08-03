// ============================================================
// Rulesets: Readability
// Adapted from Greg Kraus' readability script: https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/
// ============================================================
import Lang from '../components/translation';

export default function checkReadability() {
  // Crude hack to add a period to the end of list items to make a complete sentence.
  Sa11y.$readability.forEach(($el) => {
    const listText = $el.textContent;
    if (listText.length >= 120) {
      if (listText.charAt(listText.length - 1) !== '.') {
        $el.insertAdjacentHTML('beforeend', "<span class='sa11y-readability-period sa11y-visually-hidden'>.</span>");
      }
    }
  });
  // Compute syllables: http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript
  const numberOfSyllables = (el) => {
    let wordCheck = el;
    wordCheck = wordCheck.toLowerCase().replace('.', '').replace('\n', '');
    if (wordCheck.length <= 3) {
      return 1;
    }
    wordCheck = wordCheck.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    wordCheck = wordCheck.replace(/^y/, '');
    const syllableString = wordCheck.match(/[aeiouy]{1,2}/g);
    let syllables = 0;

    const syllString = !!syllableString;
    if (syllString) {
      syllables = syllableString.length;
    }

    return syllables;
  };

  const readabilityarray = [];
  for (let i = 0; i < Sa11y.$readability.length; i++) {
    const current = Sa11y.$readability[i];
    if (current.textContent.replace(/ |\n/g, '') !== '') {
      readabilityarray.push(current.textContent);
    }
  }

  const paragraphtext = readabilityarray.join(' ').trim().toString();
  const wordsRaw = paragraphtext.replace(/[.!?-]+/g, ' ').split(' ');
  let words = 0;
  for (let i = 0; i < wordsRaw.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (wordsRaw[i] != 0) {
      words += 1;
    }
  }

  const sentenceRaw = paragraphtext.split(/[.!?]+/);
  let sentences = 0;
  for (let i = 0; i < sentenceRaw.length; i++) {
    if (sentenceRaw[i] !== '') {
      sentences += 1;
    }
  }

  let totalSyllables = 0;
  let syllables1 = 0;
  let syllables2 = 0;
  for (let i = 0; i < wordsRaw.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (wordsRaw[i] != 0) {
      const syllableCount = numberOfSyllables(wordsRaw[i]);
      if (syllableCount === 1) {
        syllables1 += 1;
      }
      if (syllableCount === 2) {
        syllables2 += 1;
      }
      totalSyllables += syllableCount;
    }
  }

  // let characters = paragraphtext.replace(/[.!?|\s]+/g, '').length;
  // Reference: https://core.ac.uk/download/pdf/6552422.pdf
  // Reference: https://github.com/Yoast/YoastSEO.js/issues/267

  let flesch;
  if (option.readabilityLang === 'en') {
    flesch = 206.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
  } else if (option.readabilityLang === 'fr') {
    flesch = 207 - (1.015 * (words / sentences)) - (73.6 * (totalSyllables / words));
  } else if (option.readabilityLang === 'es') {
    flesch = 206.84 - (1.02 * (words / sentences)) - (0.60 * (100 * (totalSyllables / words)));
  } else if (option.readabilityLang === 'de') {
    flesch = 180 - (words / sentences) - (58.5 * (totalSyllables / words));
  } else if (option.readabilityLang === 'nl') {
    flesch = 206.84 - (0.77 * (100 * (totalSyllables / words))) - (0.93 * (words / sentences));
  } else if (option.readabilityLang === 'it') {
    flesch = 217 - (1.3 * (words / sentences)) - (0.6 * (100 * (totalSyllables / words)));
  }

  if (flesch > 100) {
    flesch = 100;
  } else if (flesch < 0) {
    flesch = 0;
  }

  const $readabilityinfo = document.getElementById('sa11y-readability-info');

  if (paragraphtext.length === 0) {
    $readabilityinfo.innerHTML = Lang._('READABILITY_NO_P_OR_LI_MESSAGE');
  } else if (words > 30) {
    const fleschScore = flesch.toFixed(1);
    const avgWordsPerSentence = (words / sentences).toFixed(1);
    const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));

    // WCAG AAA pass if greater than 60
    if (fleschScore >= 0 && fleschScore < 30) {
      $readabilityinfo.innerHTML = `<span>${fleschScore}</span> <span class="sa11y-readability-score">${Lang._('LANG_VERY_DIFFICULT')}</span>`;
    } else if (fleschScore > 31 && fleschScore < 49) {
      $readabilityinfo.innerHTML = `<span>${fleschScore}</span> <span class="sa11y-readability-score">${Lang._('LANG_DIFFICULT')}</span>`;
    } else if (fleschScore > 50 && fleschScore < 60) {
      $readabilityinfo.innerHTML = `<span>${fleschScore}</span> <span class="sa11y-readability-score">${Lang._('LANG_FAIRLY_DIFFICULT')}</span>`;
    } else {
      $readabilityinfo.innerHTML = `<span>${fleschScore}</span> <span class="sa11y-readability-score">${Lang._('LANG_GOOD')}</span>`;
    }

    document.getElementById('sa11y-readability-details').innerHTML = `<li>
        <span class='sa11y-bold'>${Lang._('LANG_AVG_SENTENCE')}</span> ${avgWordsPerSentence}</li>
        <li><span class='sa11y-bold'>${Lang._('LANG_COMPLEX_WORDS')}</span> ${complexWords}%</li>
        <li><span class='sa11y-bold'>${Lang._('LANG_TOTAL_WORDS')}</span> ${words}</li>`;
  } else {
    $readabilityinfo.textContent = Lang._('READABILITY_NOT_ENOUGH_CONTENT_MESSAGE');
  }
}
