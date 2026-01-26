import findShadowComponents from './find-shadow-components';
import { State } from './state';
import Constants from '../utils/constants';
import Elements from '../utils/elements';
import ConsoleErrors from '../interface/console-error';
import updateResults from './updateResults';

// Checks/rulesets
import checkImages from '../rulesets/images';
import checkHeaders from '../rulesets/headers';
import checkLinkText from '../rulesets/link-text';
import checkContrast from '../contrast/checkContrast';
import checkLabels from '../rulesets/labels';
import checkReadability from '../rulesets/readability';
import checkEmbeddedContent from '../rulesets/embedded-content';
import checkQA from '../rulesets/quality-assurance';
import checkDeveloper from '../rulesets/developer';
import checkCustom from '../sa11y-custom-checks';
import checkPageLanguage from '../rulesets/page-language';

/* *********************************************************** */
/*  Check All: Where all the magic happens.                    */
/* *********************************************************** */
export default async function checkAll(
  desiredRoot = State.option.checkRoot,
  desiredReadabilityRoot = State.option.readabilityRoot,
  fixedRoots = State.option.fixedRoots,
) {
  try {
    // Initialize root areas to check.
    Constants.initializeRoot(desiredRoot, desiredReadabilityRoot, fixedRoots);

    // Find all web components on the page.
    findShadowComponents();

    // Find and cache elements.
    Elements.initializeElements();

    // Ruleset checks
    checkHeaders();
    checkLinkText();
    checkImages();
    checkLabels();
    checkQA();
    checkDeveloper();
    checkEmbeddedContent();
    checkContrast();
    checkReadability();
    await checkPageLanguage();

    /* Custom checks */
    if (State.option.customChecks === true) {
      // Option 1: Provide via sa11y-custom-checks.js
      checkCustom();
    } else if (typeof State.option.customChecks === 'object') {
      // Option 2: Provide as an object when instantiated.
      State.results.push(...State.option.customChecks);
    } else if (State.option.customChecks === 'listen') {
      // Option 3: Provide via event listener. Yoinked from Editoria11y!
      State.customChecksRunning = true;
      State.customChecksFinished = 0;
      document.addEventListener('sa11y-resume', () => {
        State.customChecksFinished += 1;
        if (State.customChecksFinished === 1) {
          State.customChecksRunning = false;
          updateResults();
        }
      });
      window.setTimeout(() => {
        if (State.customChecksRunning === true) {
          State.customChecksRunning = false;
          updateResults();
          throw Error('Sa11y: No custom checks were returned.');
        }
      }, State.option.delayCustomCheck);
      window.setTimeout(() => {
        const customChecks = new CustomEvent('sa11y-custom-checks');
        document.dispatchEvent(customChecks);
      }, 0);
    }

    // No custom checks running.
    if (!State.customChecksRunning) updateResults();
  } catch (error) {
    const consoleErrors = new ConsoleErrors(error);
    document.body.appendChild(consoleErrors);
    throw Error(error);
  }
}
