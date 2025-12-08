/**
 * Rulesets: Readability
 * Adapted from Greg Kraus. References for other non-english languages included below.
 * @link https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/tools/readability-bookmarklet/
 * @link https://core.ac.uk/download/pdf/6552422.pdf
 * @link https://github.com/Yoast/YoastSEO.js/issues/267
 * @link http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript
 * @link https://www.simoahava.com/analytics/calculate-readability-scores-for-content/#commento-58ac602191e5c6dc391015c5a6933cf3e4fc99d1dc92644024c331f1ee9b6093
 * @link https://oaji.net/articles/2017/601-1498133639.pdf (Portuguese adaptation).
 */

/**
 * Compute the readability score based on an array of text strings.
 * @param {Array} textArray Array of text strings.
 * @param {string} lang The page or text language.
 * @returns Readability object.
 */
export default function computeReadability(textArray, lang) {
  // If array item does not end with punctuation, add period to improve accuracy.
  const readabilityArray = [];
  const punctuation = ['.', '?', '!'];
  textArray.forEach((text) => {
    const lastCharacter = text[text.length - 1];
    const sentence = punctuation.includes(lastCharacter) ? text : `${text}.`;
    readabilityArray.push(sentence);
  });
  const pageText = readabilityArray.join(' ');
  if (pageText.length === 0) {
    return null;
  }

  // Flesch Reading Ease: English, French, German, Dutch, Italian, Spanish, Portuguese
  if (['en', 'es', 'fr', 'de', 'nl', 'it', 'pt'].includes(lang)) {
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
      if (syllableString) {
        syllables = syllableString.length;
      }
      return syllables;
    };

    const wordsRaw = pageText.replace(/[.!?-]+/g, ' ').split(' ');
    let words = 0;
    for (let i = 0; i < wordsRaw.length; i++) {
      if (wordsRaw[i].trim() !== '') {
        words += 1;
      }
    }

    const sentenceRaw = pageText.split(/[.!?]+/);
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
      const word = wordsRaw[i];
      if (word.length > 0) {
        const syllableCount = numberOfSyllables(word);
        if (syllableCount === 1) {
          syllables1 += 1;
        } else if (syllableCount === 2) {
          syllables2 += 1;
        }
        totalSyllables += syllableCount;
      }
    }

    let flesch = false;
    if (lang === 'en') {
      flesch = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    } else if (lang === 'fr') {
      flesch = 207 - 1.015 * (words / sentences) - 73.6 * (totalSyllables / words);
    } else if (lang === 'es') {
      flesch = 206.84 - 1.02 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
    } else if (lang === 'de') {
      flesch = 180 - words / sentences - 58.5 * (totalSyllables / words);
    } else if (lang === 'nl') {
      flesch = 206.84 - 0.77 * (100 * (totalSyllables / words)) - 0.93 * (words / sentences);
    } else if (lang === 'it') {
      flesch = 217 - 1.3 * (words / sentences) - 0.6 * (100 * (totalSyllables / words));
    } else if (lang === 'pt') {
      flesch = 248.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    }

    // Score must be between 0 and 100%.
    if (flesch > 100) {
      flesch = 100;
    } else if (flesch < 0) {
      flesch = 0;
    }

    // Compute scores.
    const fleschScore = Number(flesch.toFixed(1));
    const avgWordsPerSentence = Number((words / sentences).toFixed(1));
    const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));

    let difficultyToken;
    if (fleschScore >= 0 && fleschScore < 30) {
      difficultyToken = 'VERY_DIFFICULT';
    } else if (fleschScore > 31 && fleschScore < 49) {
      difficultyToken = 'DIFFICULT';
    } else if (fleschScore > 50 && fleschScore < 60) {
      difficultyToken = 'FAIRLY_DIFFICULT';
    } else {
      difficultyToken = 'GOOD';
    }

    return {
      score: fleschScore,
      averageWordsPerSentence: avgWordsPerSentence,
      complexWords,
      difficultyToken,
      wordCount: words,
      charCount: pageText.length,
    };
  }

  // LIX: Danish, Finnish, Norwegian (Bokmål & Nynorsk), Swedish
  if (['sv', 'fi', 'da', 'no', 'nb', 'nn'].includes(lang)) {
    const lixWords = () =>
      pageText
        .replace(/[-'.]/gi, '')
        .split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g)
        .filter(Boolean);

    const splitSentences = () => {
      const splitter = /\?|!|\.|\n/g;
      return pageText.split(splitter).filter(Boolean);
    };

    const wordsArr = lixWords(pageText);
    const wordCount = wordsArr.length;
    const longWordsCount = wordsArr.filter((w) => w.length > 6).length;
    const sentenceCount = splitSentences(pageText).length || 1;
    const score = Math.round(wordCount / sentenceCount + (longWordsCount * 100) / wordCount);
    const avgWordsPerSentence = Number((wordCount / sentenceCount).toFixed(1));
    const complexWords = Math.round(100 * (longWordsCount / wordCount));

    let difficultyToken;
    if (score >= 0 && score < 39) {
      difficultyToken = 'GOOD';
    } else if (score > 40 && score < 50) {
      difficultyToken = 'FAIRLY_DIFFICULT';
    } else if (score > 51 && score < 61) {
      difficultyToken = 'DIFFICULT';
    } else {
      difficultyToken = 'VERY_DIFFICULT';
    }

    return {
      score,
      averageWordsPerSentence: avgWordsPerSentence,
      complexWords,
      difficultyToken,
      wordCount,
      charCount: pageText.length,
    };
  }

  return null;
}
