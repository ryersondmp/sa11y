import styles from '../../css/global-utilities.css?inline';
import Constants from '../utils/constants';

/* ************************************************************ */
/*  Auto-detect shadow DOM or process provided web components.  */
/* ************************************************************ */
const addStyleUtilities = (component) => {
  const CSSUtils = component.shadowRoot.querySelectorAll('.sa11y-css-utilities');
  if (CSSUtils.length === 0) {
    const style = document.createElement('style');
    style.setAttribute('class', 'sa11y-css-utilities');
    style.textContent = styles;
    component.shadowRoot.appendChild(style);
  }
};

export default function findShadowComponents(option) {
  if (option.autoDetectShadowComponents) {
    // Elements to ignore.
    const ignore = Constants.Exclusions.Sa11yElements;

    // Search all elements.
    const root = document.querySelector(option.checkRoot);
    const search = root
      ? Array.from(root.querySelectorAll(`*:not(${ignore})`))
      : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

    // Query for open shadow roots & inject CSS utilities into every shadow DOM.
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        component.setAttribute('data-sa11y-has-shadow-root', '');
        addStyleUtilities(component);
      }
    });
  } else if (option.shadowComponents) {
    const providedShadow = document.querySelectorAll(option.shadowComponents);
    providedShadow.forEach((component) => {
      component.setAttribute('data-sa11y-has-shadow-root', '');
      addStyleUtilities(component);
    });
  }
}
