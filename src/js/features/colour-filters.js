import Constants from '../utils/constants';

/* ************************************************************** */
/*  DaltonLens SVG filters to simulate color vision deficiencies  */
/*  Source: https://daltonlens.org/opensource-cvd-simulation/
/*  Achromatopsia: https://github.com/chromelens/chromelens/blob/master/lenses/filters/lens_achromatopsia.js */
/* ************************************************************** */

/* Sa11y 4.4.1: The original tritanopia filter from DaltonLens uses multiple SVG filter steps, which makes Firefox ESR flatten the page into an image and causes text to look blurry. Using a single colour matrix avoids that flattening, so text stays sharp. The tritanopia single matrix is from https://gist.github.com/Lokno/df7c3bfdc9ad32558bb7
 */
export function addColourFilters() {
  if (Constants.Global.colourFilterPlugin) {
    if (Constants.Global.headless === false) {
      const svg = document.createElement('div');
      svg.id = 'sa11y-colour-filters';
      // Note: Do not set 'display: none;' on parent container, otherwise it won't render in Firefox.
      svg.innerHTML = `
        <!-- DaltonLens SVG filters to simulate color vision deficiencies -->
        <svg id="sa11y-svg-filters" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <filter id="sa11y-protanopia" color-interpolation-filters="linearRGB">
            <feColorMatrix type="matrix" in="SourceGraphic" values="
                0.10889,0.89111,-0.00000,0,0
                0.10889,0.89111,0.00000,0,0
                0.00447,-0.00447,1.00000,0,0
                0,0,0,1,0"
            />
          </filter>
          <filter id="sa11y-deuteranopia" color-interpolation-filters="linearRGB">
            <feColorMatrix type="matrix" in="SourceGraphic" values="
                0.29031,0.70969,-0.00000,0,0
                0.29031,0.70969,-0.00000,0,0
                -0.02197,0.02197,1.00000,0,0
                0,0,0,1,0"
            />
          </filter>
          <filter id="sa11y-tritanopia" color-interpolation-filters="linearRGB">
            <feColorMatrix type="matrix" in="SourceGraphic" values="
              0.950, 0.050, 0.000, 0, 0
              0.000, 0.433, 0.567, 0, 0
              0.000, 0.475, 0.525, 0, 0
              0.000, 0.000, 0.000, 1, 0
            "/>
          </filter>
          <filter id="sa11y-monochromacy">
            <feColorMatrix values="0.299,0.587,0.114,0,0,0.299,0.587,0.114,0,0,0.299,0.587,0.114,0,0,0,0,0,1,0"></feColorMatrix>
          </filter>
        </svg>`;
      document.body.appendChild(svg);
    }
  }
}

// Reset colour filters
export function resetColourFilters() {
  if (Constants.Global.colourFilterPlugin) {
    document.body.removeAttribute('data-sa11y-filter');

    // Restore Settings panel switches.
    Constants.Panel.settingsContent.classList.remove('hide-settings-border');

    // Set Colour Filters select to "Off"
    Constants.Panel.colourFilterSelect.value = 0;

    // Hide Colour Filter active state.
    Constants.Panel.colourPanel.removeAttribute('data-colour');
    Constants.Panel.colourPanel.classList.remove('active');
    Constants.Panel.colourFilterSelect.classList.remove('active');

    // Restore main Error / Warning panel.
    Constants.Panel.content.hidden = false;

    // Restore Page Outline/Images/Settings controls.
    Constants.Panel.controls.hidden = false;
  }
}
