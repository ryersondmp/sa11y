import Constants from '../utils/constants';
import Elements from '../utils/elements';
import Lang from '../utils/lang';
import computeReadability from '../utils/readability-utils';
import { State } from '../core/state';

export default function checkReadability() {
  // Compute.
  const computed = computeReadability(Elements.Found.Readability, Constants.Readability.Lang);

  // Generate result object.
  let result;
  if (computed) {
    result = {
      test: 'READABILITY',
      difficultyLevel: Lang._(computed.difficultyToken),
      ...computed,
    };
    State.results.push(result);
  }

  // Paint UI.
  if (State.option.headless) return;
  if (computed && result.wordCount > 30) {
    const { score, difficultyLevel, averageWordsPerSentence, complexWords, wordCount } = result;
    Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(score)} <span class="readability-score">${difficultyLevel}</span>`;
    const details = [
      [Lang._('AVG_SENTENCE'), Math.ceil(averageWordsPerSentence)],
      [Lang._('COMPLEX_WORDS'), `${complexWords}%`],
      [Lang._('TOTAL_WORDS'), wordCount],
    ]
      .map(([label, value]) => `<li><strong>${label}</strong> ${value}</li>`)
      .join('');
    Constants.Panel.readabilityDetails.innerHTML = details;
  } else {
    Constants.Panel.readabilityInfo.innerHTML = `<br>${Lang._('READABILITY_NOT_ENOUGH')}`;
  }
}
