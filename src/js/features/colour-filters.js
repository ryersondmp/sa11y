import Constants from '../utils/constants';

/* ************************************************************** */
/*  DaltonLens SVG filters to simulate color vision deficiencies  */
/*  Source: https://daltonlens.org/opensource-cvd-simulation/
/*  Achromatopsia: https://github.com/chromelens/chromelens/blob/master/lenses/filters/lens_achromatopsia.js */
/* ************************************************************** */
export function addColourFilters() {
  if (Constants.Global.colourFilterPlugin) {
    if (Constants.Global.headless === false) {
      const svg = document.createElement('div');
      svg.id = 'sa11y-colour-filters';
      svg.setAttribute('aria-hidden', 'true');
      // Note: Do not set 'display: none;' on parent container, otherwise it won't render in Firefox.
      svg.innerHTML = `
        <!-- DaltonLens SVG filters to simulate color vision deficiencies -->
        <svg id="sa11y-svg-filters" xmlns="http://www.w3.org/2000/svg">
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
            <feColorMatrix type="matrix" in="SourceGraphic" result="ProjectionOnPlane1" values="
                1.01354, 0.14268, -0.15622, 0, 0
                -0.01181, 0.87561, 0.13619, 0, 0
                0.07707, 0.81208, 0.11085, 0, 0
                7.92482, -5.66475, -2.26007, 1, -0.2"
            />
            <feComponentTransfer in="ProjectionOnPlane1" result="ProjectionOnPlane1">
                <feFuncA type="discrete" tableValues="0 0 0 0 1"/>
            </feComponentTransfer>
            <feColorMatrix type="matrix" in="SourceGraphic" result="ProjectionOnPlane2" values="
                0.93337, 0.19999, -0.13336, 0, 0
                0.05809, 0.82565, 0.11626, 0, 0
                -0.37923, 1.13825, 0.24098, 0, 0
                0,0,0,1,0"
            />
            <feBlend in="ProjectionOnPlane1" in2="ProjectionOnPlane2" mode="normal"/>
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
    Constants.Panel.colourFilterSelect.value = 0;
    Constants.Panel.colourPanel.classList.remove('active');
    Constants.Panel.colourFilterSelect.classList.remove('active');
    Constants.Panel.content.hidden = false;
  }
}
