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
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import * as Utils from '../utils/utils';
import Lang from '../utils/lang';

export default function checkReadability() {
  let results;
  const rememberReadability = Utils.store.getItem('sa11y-readability') === 'On';
  if (rememberReadability) {
    const readabilityArray = [];
    // Improve the accuracy of a readability analysis by ensuring that long list items are treated as complete sentences.
    Elements.Found.Readability.forEach((el) => {
      const ignore = Utils.fnIgnore(el);
      const text = Utils.getText(ignore);
      if (text.length > 0) {
        const lastChar = text.charAt(text.length - 1);
        const punctuation = ['.', '?', '!', ';'];
        if (el.tagName === 'LI' && text.length >= 120 && !punctuation.includes(lastChar)) {
          readabilityArray.push(`${text}.`);
        } else {
          readabilityArray.push(text);
        }
      }
    });
    const pageText = readabilityArray.join(' ');

    /* Flesch Reading Ease for English, French, German, Dutch, and Italian. */
    if (['en', 'es', 'fr', 'de', 'nl', 'it', 'pt'].includes(Constants.Readability.Lang)) {
      // Compute syllables
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

      // Words
      const wordsRaw = pageText.replace(/[.!?-]+/g, ' ').split(' ');
      let words = 0;
      for (let i = 0; i < wordsRaw.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (wordsRaw[i] != 0) {
          words += 1;
        }
      }

      // Sentences
      const sentenceRaw = pageText.split(/[.!?]+/);
      let sentences = 0;
      for (let i = 0; i < sentenceRaw.length; i++) {
        if (sentenceRaw[i] !== '') {
          sentences += 1;
        }
      }

      // Syllables
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

      let flesch = false;
      if (Constants.Readability.Lang === 'en') {
        flesch = 206.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'fr') {
        flesch = 207 - (1.015 * (words / sentences)) - (73.6 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'es') {
        flesch = 206.84 - (1.02 * (words / sentences)) - (0.60 * (100 * (totalSyllables / words)));
      } else if (Constants.Readability.Lang === 'de') {
        flesch = 180 - (words / sentences) - (58.5 * (totalSyllables / words));
      } else if (Constants.Readability.Lang === 'nl') {
        flesch = 206.84 - (0.77 * (100 * (totalSyllables / words))) - (0.93 * (words / sentences));
      } else if (Constants.Readability.Lang === 'it') {
        flesch = 217 - (1.3 * (words / sentences)) - (0.6 * (100 * (totalSyllables / words)));
      } else if (Constants.Readability.Lang === 'pt') {
        flesch = 248.835 - (1.015 * (words / sentences)) - (84.6 * (totalSyllables / words));
      }

      // Score must be between 0 and 100%.
      if (flesch > 100) {
        flesch = 100;
      } else if (flesch < 0) {
        flesch = 0;
      }

      // Compute scores.
      const fleschScore = flesch.toFixed(1);
      const avgWordsPerSentence = (words / sentences).toFixed(1);
      const complexWords = Math.round(100 * ((words - (syllables1 + syllables2)) / words));

      let difficulty;
      if (fleschScore >= 0 && fleschScore < 30) {
        difficulty = Lang._('VERY_DIFFICULT');
      } else if (fleschScore > 31 && fleschScore < 49) {
        difficulty = Lang._('DIFFICULT');
      } else if (fleschScore > 50 && fleschScore < 60) {
        difficulty = Lang._('FAIRLY_DIFFICULT');
      } else {
        difficulty = Lang._('GOOD');
      }

      // Create object for headless mode.
      results = {
        score: fleschScore,
        averageWordsPerSentence: avgWordsPerSentence,
        complexWords,
        difficultyLevel: difficulty,
        wordCount: words,
      };
    } else if (['sv', 'fi', 'da', 'no', 'nb', 'nn'].includes(Constants.Readability.Lang)) {
      /* Lix: Danish, Finnish, Norwegian (Bokmål & Nynorsk), Swedish. */
      const calculateLix = (text) => {
        const lixWords = () => text.replace(/[-'.]/ig, '').split(/[^a-zA-ZöäåÖÄÅÆæØø0-9]/g).filter(Boolean);
        const splitSentences = () => {
          const splitter = /\?|!|\.|\n/g;
          const arrayOfSentences = text.split(splitter).filter(Boolean);
          return arrayOfSentences;
        };
        const wordCount = lixWords(text).length;
        const longWordsCount = lixWords(text).filter((wordsArray) => wordsArray.length > 6).length;
        const sentenceCount = splitSentences(text).length;
        const score = Math.round((wordCount / sentenceCount) + ((longWordsCount * 100) / wordCount));
        const avgWordsPerSentence = (wordCount / sentenceCount).toFixed(1);
        const complexWords = Math.round(100 * (longWordsCount / wordCount));

        let difficulty;
        if (score >= 0 && score < 39) {
          difficulty = Lang._('GOOD');
        } else if (score > 40 && score < 50) {
          difficulty = Lang._('FAIRLY_DIFFICULT');
        } else if (score > 51 && score < 61) {
          difficulty = Lang._('DIFFICULT');
        } else {
          difficulty = Lang._('VERY_DIFFICULT');
        }
        return {
          score, difficulty, avgWordsPerSentence, complexWords, wordCount,
        };
      };

      // Compute LIX
      const lix = calculateLix(pageText);

      // Create object for headless mode.
      results = {
        score: lix.score,
        averageWordsPerSentence: lix.avgWordsPerSentence,
        complexWords: lix.complexWords,
        difficultyLevel: lix.difficulty,
        wordCount: lix.wordCount,
      };
    }

    // Update main panel if not in headless mode.
    if (Constants.Global.headless === false) {
      if (pageText.length === 0) {
        Constants.Panel.readabilityInfo.innerHTML = Lang._('READABILITY_NO_CONTENT');
      } else if (results.wordCount > 30) {
        Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(results.score)} <span class="readability-score">${results.difficultyLevel}</span>`;
        Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._('AVG_SENTENCE')}</strong> ${Math.ceil(results.averageWordsPerSentence)}</li><li><strong>${Lang._('COMPLEX_WORDS')}</strong> ${results.complexWords}%</li><li><strong>${Lang._('TOTAL_WORDS')}</strong> ${results.wordCount}</li>`;
      } else {
        Constants.Panel.readabilityInfo.textContent = Lang._('READABILITY_NOT_ENOUGH');
      }
    }
  }
  return results;
}
