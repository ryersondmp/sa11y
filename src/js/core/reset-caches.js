import * as Utils from '../utils/utils';
import { resetContrastCaches } from '../contrast/utils';

/**
 * Clears every cache that is only valid for one check.
 *
 * These caches assume the DOM does not change while a check runs. Several of them store results
 * for ancestors as well as for the element asked about (closest matches, backgrounds), so after
 * the page changes, a stale entry would also be used for new elements inserted below that
 * ancestor. Clear them before every check. Integrations that run the rulesets with their own
 * check loop (e.g. Editoria11y) must call this at the start of each run too.
 */
export default function resetCaches() {
  Utils.resetGetText();
  Utils.resetStyleCache();
  Utils.resetParentCache();
  resetContrastCaches();
}
