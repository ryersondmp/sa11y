import styles from '../../../dist/css/global-utilities.min.css';

const addStylestoShadow = (component) => {
  const style = document.createElement('style');
  style.setAttribute('class', 'sa11y-css-utilities');
  style.textContent = styles;
  component.shadowRoot.appendChild(style);
};

export default function findShadowComponents(
  checkRoot,
  autoDetectShadowComponents,
  shadowComponents,
) {
  let shadowComponentsElements;
  if (autoDetectShadowComponents === true) {
    const rootElement = document.querySelector(checkRoot);
    let everything;
    if (!rootElement) {
      everything = document.body.querySelectorAll('*');
    } else {
      everything = rootElement.querySelectorAll('*');
    }

    const ignored = ['sa11y-heading-label', 'sa11y-heading-anchor', 'sa11y-annotation', 'sa11y-tooltips', 'sa11y-dismiss-tooltip', 'sa11y-control-panel'];

    // Query for open shadow roots.
    const foundShadows = [];
    everything.forEach((component) => {
      if (component.shadowRoot && component.shadowRoot.mode === 'open' && !ignored.includes(component.tagName.toLowerCase())) {
        foundShadows.push(component);

        // Inject CSS utilities into every shadow DOM.
        addStylestoShadow(component);
      }
    });

    // Return ALL web components on the page.
    const all = Array.from(foundShadows).map((component) => component.tagName.toLowerCase());

    if (all.length === 1) {
      shadowComponentsElements = `${all.toString()}`;
    } else {
      shadowComponentsElements = all.join(', ');
    }
  } else {
    // If autoDetectShadowComponents is OFF, use provided shadow dom.
    shadowComponentsElements = shadowComponents || '';

    // Append styles to each provided shadow dom.
    if (shadowComponentsElements) {
      const providedShadow = document.querySelectorAll(shadowComponentsElements);
      providedShadow.forEach((component) => {
        addStylestoShadow(component);
      });
    }
  }
  return shadowComponentsElements;
}
