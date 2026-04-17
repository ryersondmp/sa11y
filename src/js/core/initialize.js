import { State } from './state';
import * as Utils from '../utils/utils';
import Constants from '../utils/constants';
import checkAll from './checkAll';
import { resetAll } from './resetAll';
import detectPageChanges from '../features/detect-page-changes';
import { addColourFilters } from '../features/colour-filters';
import mainToggle from './main-toggle-logic';
import ControlPanel from '../interface/control-panel';
import settingsPanelToggles from './settings-panel-logic';
import initializePanelToggles from './control-panel-logic';
import { AnnotationTooltips, PanelTooltips } from '../interface/tooltips';
import { Annotations } from '../interface/annotations';
import { HeadingAnchor, HeadingLabel } from '../interface/heading-labels';
import ConsoleErrors from '../interface/console-error';

/* *********************************************************** */
/*  Initialize: Start your engines.                            */
/* *********************************************************** */
export default function initialize() {
  const { option } = State;

  // Do not run Sa11y if any supplied elements detected on page.
  if (option.doNotRun?.trim() && document.querySelector(option.doNotRun)) return;

  // Register web components
  customElements.define('sa11y-heading-label', HeadingLabel);
  customElements.define('sa11y-heading-anchor', HeadingAnchor);
  customElements.define('sa11y-annotation', Annotations);
  customElements.define('sa11y-tooltips', AnnotationTooltips);
  customElements.define('sa11y-panel-tooltips', PanelTooltips);
  customElements.define('sa11y-control-panel', ControlPanel);
  customElements.define('sa11y-console-error', ConsoleErrors);

  // Initialize global constants and exclusions.
  Constants.initializeGlobal();
  Constants.initializeReadability();
  Constants.initializeExclusions();

  // Make "Developer checks" on by default or if toggle switch is visually hidden.
  if (option.developerChecksOnByDefault) {
    if (Utils.store.getItem('sa11y-developer') === null || option.checkAllHideToggles) {
      Utils.store.setItem('sa11y-developer', 'On');
    }
  }

  // Once document has fully loaded.
  Utils.documentLoadingCheck(() => {
    // Headless: Perform all checks without loading UI.
    if (option.headless) {
      checkAll();
      Utils.store.removeItem('sa11y-dismissed-digest');
      return;
    }

    // Save panel position preference if not already set or if position changes via props.
    const savedPos = Utils.store.getItem('sa11y-position');
    const position = Constants.Global.panelPosition;
    const isTop = (position) => position.includes('top');
    if (option.showMovePanelToggle && (!savedPos || isTop(savedPos) !== isTop(position))) {
      Utils.store.setItem('sa11y-position', position);
    }

    // Build control panel.
    const controlPanel = new ControlPanel();
    document.body.appendChild(controlPanel);

    // Initialize control panel.
    settingsPanelToggles();
    initializePanelToggles();
    addColourFilters();
    detectPageChanges();
    mainToggle();

    // Initialize panel tooltips.
    State.panelTooltips = new PanelTooltips();
    document.body.appendChild(State.panelTooltips);

    // Disable button if user needs to wait longer than 700ms.
    Constants.Panel.toggle.disabled = option.delayCheck >= 700;

    // Initial check once page is done loading.
    setTimeout(() => {
      resetAll();
      checkAll();
    }, option.delayCheck);
  });
}
