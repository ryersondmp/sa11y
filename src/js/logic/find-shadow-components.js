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

export default function findShadowComponents(
  checkRoot,
  autoDetectShadowComponents,
  suppliedShadowComponents,
) {
  let webComponents;
  if (autoDetectShadowComponents === true) {
    // Elements to ignore.
    const ignore = 'sa11y-heading-label, sa11y-heading-anchor, sa11y-annotation, sa11y-tooltips, sa11y-dismiss-tooltip, sa11y-control-panel, #sa11y-colour-filters, #sa11y-colour-filters *, script';

    // Search all elements.
    const root = document.querySelector(checkRoot);
    const search = (root) ? Array.from(root.querySelectorAll(`*:not(${ignore})`)) : Array.from(document.body.querySelectorAll(`*:not(${ignore})`));

    // Query for open shadow roots & inject CSS utilities into every shadow DOM.
    const foundShadows = [];
    search.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open') {
        foundShadows.push(component);
        addStylestoShadow(component);
      }
    });

    // Return ALL web components on the page.
    const all = Array.from(foundShadows).map((component) => component.tagName.toLowerCase());
    webComponents = (all.length === 1) ? `${all.toString()}` : all.join(', ');
  } else {
    // If autoDetectShadowComponents is OFF, use provided shadow dom.
    webComponents = suppliedShadowComponents || '';

    // Append styles to each provided shadow dom.
    if (webComponents) {
      const providedShadow = document.querySelectorAll(webComponents);
      providedShadow.forEach((component) => {
        addStylestoShadow(component);
      });
    }
  }
  return webComponents;
}
