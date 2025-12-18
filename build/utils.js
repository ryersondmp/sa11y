import { transform, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

const targets = browserslistToTargets(browserslist('defaults, not IE 11'));

/**
 * CSS injection plugin.
 */
export const injectCSSintoJS = () => ({
  name: 'inject-css',
  async transform(code, id) {
    if (/\.css(\?.*)?$/.test(id) && id.includes('/src/css/')) {
      try {
        const { code: minified } = transform({
          filename: id,
          code: Buffer.from(code),
          minify: true,
          sourceMap: false,
          targets: targets,
        });
        return { code: minified.toString() };
      } catch (e) {
        console.log(e)
        console.warn('⚠️ CSS Minification failed', e.message);
        return code;
      }
    }
  }
});
