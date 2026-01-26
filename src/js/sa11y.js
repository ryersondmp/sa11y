import initialize from './core/initialize';
import { State, setState } from './core/state';
import Lang from './utils/lang';
import { enabled, disabled } from './core/update-panel';
import find from './utils/find';
import * as Utils from './utils/utils';
import checkAll from './core/checkAll';
import { resetAll } from './core/resetAll';

class Sa11y {
  constructor(options) {
    // Initialize options.
    setState(options);

    // Initialize Sa11y.
    initialize();

    // Expose all utility methods.
    Object.assign(this, Utils, {
      checkAll,
      resetAll,
      find,
      enabled,
      disabled,
    });
  }

  // Get main results array.
  get results() {
    return State.results;
  }
}

export { Lang, Sa11y };
