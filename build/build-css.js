import fs from 'fs';
import path from 'path';
import { bundle, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

// We only need to compile sa11y.css, as the remaining files are minified via other utility function and imported via js into web components.
const cssFiles = [
  'sa11y',
];

const srcDir = 'src/css';
const distDir = 'dist/css';
const targets = browserslistToTargets(browserslist('defaults, not IE 11'));

(async () => {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  cssFiles.forEach((name) => {
    const filename = `${name}.css`;
    const inputPath = path.join(srcDir, filename);

    // Common config for bundling.
    const bundleConfig = {
      filename: inputPath,
      sourceMap: false,
      targets,
    };

    try {
      const unminified = bundle({
        ...bundleConfig,
        minify: false,
      });
      fs.writeFileSync(path.join(distDir, filename), unminified.code);

      const minified = bundle({
        ...bundleConfig,
        minify: true,
      });
      const minFilename = filename.replace('.css', '.min.css');
      fs.writeFileSync(path.join(distDir, minFilename), minified.code);
    } catch (err) {
      console.error(`❌ Error bundling ${filename}:`, err.message);
      process.exit(1);
    }
  });
  console.log(`✅ Compiled ${cssFiles.length} CSS files.`);
})();
