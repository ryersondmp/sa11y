/**
 * DaltonLens SVG filters to simulate color vision deficiencies
 *
 * https://daltonlens.org/opensource-cvd-simulation/ for a
 * discussion of the various methods.
 * The various matrices were generated from DaltonLens-Python.
 * It is very important for these filters to get applied in
 * linearRGB, which is supposed to be the default, but never
 * hurts to specify it explicitly.
*/
import Constants from '../utils/constants';

export default function addColourFilters(colourFilterPlugin) {
  if (colourFilterPlugin === true) {
    if (Constants.Global.headless === false) {
      const svg = document.createElement('div');
      svg.id = 'sa11y-colour-filters';
      svg.style.display = 'none';
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = `
        <!-- DaltonLens SVG filters to simulate color vision deficiencies -->
        <svg>
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
        </svg>`;
      document.body.appendChild(svg);
    }
  }
}
