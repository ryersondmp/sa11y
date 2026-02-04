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
  if (State.option.headless === false) {
    if (computed && result.wordCount > 30) {
      Constants.Panel.readabilityInfo.innerHTML = `${Math.ceil(result.score)} <span class="readability-score">${result.difficultyLevel}</span>`;
      Constants.Panel.readabilityDetails.innerHTML = `<li><strong>${Lang._('AVG_SENTENCE')}</strong> ${Math.ceil(result.averageWordsPerSentence)}</li><li><strong>${Lang._('COMPLEX_WORDS')}</strong> ${result.complexWords}%</li><li><strong>${Lang._('TOTAL_WORDS')}</strong> ${result.wordCount}</li>`;
    } else {
      Constants.Panel.readabilityInfo.innerHTML = `<br>${Lang._('READABILITY_NOT_ENOUGH')}`;
    }
  }
}
