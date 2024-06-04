import styles from '../../../dist/css/global-utilities.min.css';

/* ************************************************************ */
/*  Auto-detect shadow DOM or process provided web components.  */
/* ************************************************************ */
const addStylestoShadow = (component) => {
  const style = document.createElement('style');
  style.setAttribute('class', 'sa11y-css-utilities');
  style.textContent = styles;
  component.shadowRoot.appendChild(style);
};

export default function findShadowComponents(option) {
  if (option.autoDetectShadowComponents) {
    // Elements to ignore.
    const ignore = 'sa11y-heading-label, sa11y-heading-anchor, sa11y-annotation, sa11y-tooltips, sa11y-dismiss-tooltip, sa11y-control-panel, #sa11y-colour-filters, #sa11y-colour-filters *, script';

    // Search all elements.
    const root = document.querySelector(option.checkRoot);
    const search = (root) ? Array.from(root.querySelectorAll(`*:not(${ignore})`)) : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

    // Query for open shadow roots & inject CSS utilities into every shadow DOM.
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        component.setAttribute('data-sa11y-has-shadow-root', '');
        addStylestoShadow(component);
      }
    });
  } else if (option.shadowComponents) {
    const providedShadow = document.querySelectorAll(option.shadowComponents);
    providedShadow.forEach((component) => {
      component.setAttribute('data-sa11y-has-shadow-root', '');
      addStylestoShadow(component);
    });
  }
}
