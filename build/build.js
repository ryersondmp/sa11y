import { build } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { injectCSSintoJS } from './utils.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pkg = JSON.parse(fs.readFileSync(path.resolve(dirname, '../package.json'), 'utf-8'));

/* Adds copyright banner AFTER minification. */
const addBanner = () => {
  const banner = `
    /*!
      * Sa11y, the accessibility quality assurance assistant.
      * @version ${pkg.version}
      * @author ${pkg.author}
      * @license ${pkg.license}
      * @copyright © 2020 - ${new Date().getFullYear()} Toronto Metropolitan University.
      * @contact ${pkg.email}
      * GitHub: ${pkg.repository.url} | Website: https://sa11y.netlify.app
      * The above copyright notice shall be included in all copies or substantial portions of the Software.
    **/`;

  return {
    name: 'add-banner',
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        const file = bundle[fileName];
        // Only add banner to JS chunks (excludes CSS or assets)
        if (file.type === 'chunk') {
          file.code = banner.trim() + '\n' + file.code;
        }
      }
    },
  };
};

// Shared define.
const getDefine = () => ({
  'process.env.NODE_ENV': JSON.stringify('production'),
  Sa11yVersion: JSON.stringify(pkg.version),
});

/* Helper to run a Vite build instance. */
const runBuild = async (config) => {
  await build({
    configFile: false,
    logLevel: 'info',
    ...config,
  });
};

/* ******************************************************** */
/* BUILD EXECUTION                                          */
/* ******************************************************** */
(async () => {
  console.log(`\n🚀 Starting build process for version ${pkg.version}\n`);

  const languages = ['bg', 'cs', 'da', 'de', 'el', 'en', 'enUS', 'es', 'et', 'fi', 'fr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'pl', 'ptBR', 'ptPT', 'ro', 'sk', 'sl', 'sv', 'tr', 'ua', 'zh'];

  console.log(`Processing ${languages.length} language files...`);

  for (const lang of languages) {
    const langEntry = path.resolve(dirname, `../src/js/lang/${lang}.js`);

    // Build ESM
    await runBuild({
      build: {
        emptyOutDir: false,
        minify: false,
        outDir: 'dist/js/lang',
        lib: {
          entry: langEntry,
          fileName: () => `${lang}.js`,
          formats: ['es'],
        },
      },
    });

    // Build UMD
    await runBuild({
      build: {
        emptyOutDir: false,
        minify: false,
        outDir: 'dist/js/lang',
        lib: {
          entry: langEntry,
          name: `Sa11yLang${lang.charAt(0).toUpperCase() + lang.slice(1)}`,
          fileName: () => `${lang}.umd.js`,
          formats: ['umd'],
        },
      },
    });
  }

  // Core library.
  const mainEntry = path.resolve(dirname, '../src/js/sa11y.js');

  // ESM - Unminified
  await runBuild({
    define: getDefine(),
    plugins: [
      injectCSSintoJS(),
      addBanner(),
    ],
    build: {
      emptyOutDir: false,
      minify: false,
      outDir: 'dist/js',
      lib: { entry: mainEntry, formats: ['es'], fileName: () => 'sa11y.esm.js' },
    },
  });

  // ESM - Minified (using esbuild)
  await runBuild({
    define: getDefine(),
    plugins: [
      injectCSSintoJS(),
      addBanner(),
    ],
    build: {
      emptyOutDir: false,
      minify: true,
      outDir: 'dist/js',
      lib: { entry: mainEntry, formats: ['es'], fileName: () => 'sa11y.esm.min.js' },
    },
  });

  // UMD - Unminified
  await runBuild({
    define: getDefine(),
    plugins: [
      injectCSSintoJS(),
      addBanner(),
    ],
    build: {
      emptyOutDir: false,
      minify: false,
      outDir: 'dist/js',
      lib: { entry: mainEntry, formats: ['umd'], name: 'Sa11y', fileName: () => 'sa11y.umd.js' },
    },
  });

  // UMD - Minified (using esbuild)
  await runBuild({
    define: getDefine(),
    plugins: [
      injectCSSintoJS(),
      addBanner(),
    ],
    build: {
      emptyOutDir: false,
      minify: true,
      outDir: 'dist/js',
      lib: { entry: mainEntry, formats: ['umd'], name: 'Sa11y', fileName: () => 'sa11y.umd.min.js' },
    },
  });

  console.log('Processing bookmarklets...');
  const bookmarklets = [
    { input: 'v2.js', name: 'Sa11yLangBookmarklet', file: 'v2.js' },
    { input: 'v2-en.js', name: 'Sa11yLangBookmarkletEn', file: 'v2-en.js' },
    { input: 'dev.js', name: 'Sa11yDevBookmarklet', file: 'dev.js' },
    { input: 'apca.js', name: 'Sa11yLangBookmarkletAPCA', file: 'apca.js' },
    { input: 'unminified.js', name: 'Sa11yLangBookmarkletUnminified', file: 'unminified.js' },
  ];

  for (const b of bookmarklets) {
    await runBuild({
      define: getDefine(),
      plugins: [
        injectCSSintoJS(),
      ],
      build: {
        emptyOutDir: false,
        minify: true,
        outDir: 'bookmarklet',
        lib: {
          entry: path.resolve(dirname, `../src/bookmarklet/${b.input}`),
          name: b.name,
          formats: ['umd'],
          fileName: () => b.file,
        },
      },
    });
  }

  console.log('\n✨ Build complete!\n');
})();
