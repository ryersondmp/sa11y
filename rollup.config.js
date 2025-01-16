/* eslint-disable no-shadow */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass';
import cssnano from 'cssnano';
import postcss from 'postcss';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

/* Speed up compile time when developing by excluding language builds. */
export const developmentMode = false;

/* Copyright notice */
const banner = `
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version ${pkg.version}
  * @author ${pkg.author}
  * @license ${pkg.license}
  * @copyright © 2020 - ${new Date().getFullYear()} Toronto Metropolitan University.
  * @contact ${pkg.email}
  * GitHub: ${pkg.repository.url} | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/`;

/**
 * Reusable function to process SCSS files.
 * @param {string} input - Input SCSS file path.
 * @param {string} output - Output CSS file path.
 * @param {string} outputMin - Output minified CSS file path.
 * @returns {Promise<string>} - Empty string.
 */
const processSCSS = async (input, output, outputMin) => {
  const result = await postcss([autoprefixer]).process(input, { from: undefined });
  const path = `dist/css/${output}`;
  const pathMin = `dist/css/${outputMin}`;

  if (!existsSync(dirname(path))) {
    await mkdir(dirname(path), { recursive: true });
  }
  await writeFile(path, result.css, { encoding: 'utf8' });

  const minifiedResult = await postcss([cssnano]).process(result.css, { from: undefined });
  if (!existsSync(dirname(pathMin))) {
    await mkdir(dirname(pathMin), { recursive: true });
  }
  await writeFile(pathMin, minifiedResult.css, { encoding: 'utf8' });
  return '';
};

/* ********************* */
/*    Language files     */
/* ********************* */
const languages = (developmentMode) ? ['en'] : [
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'enUS',
  'es',
  'et',
  'fi',
  'fr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'lt',
  'lv',
  'nb',
  'nl',
  'pl',
  'ptBR',
  'ptPT',
  'ro',
  'sk',
  'sl',
  'sv',
  'tr',
  'ua',
  'zh',
];
const languageConfigs = languages.flatMap((lang) => [
  {
    input: `src/js/lang/${lang}.js`,
    plugins: [nodeResolve()],
    output: [
      {
        banner,
        file: `dist/js/lang/${lang}.js`,
        format: 'esm',
      },
    ],
  },
  {
    input: `src/js/lang/${lang}.js`,
    plugins: [nodeResolve()],
    output: [
      {
        banner,
        file: `dist/js/lang/${lang}.umd.js`,
        format: 'umd',
        name: `Sa11yLang${lang.charAt(0).toUpperCase() + lang.slice(1)}`,
      },
    ],
  },
]);

/* ********************* */
/*      SCSS files       */
/* ********************* */
const scssFiles = [
  'sa11y',
  'control-panel',
  'shared',
  'annotations',
  'tooltips',
  'global-utilities',
  'console-errors',
  'export-results',
];
const scssConfigs = scssFiles.map((file) => ({
  input: `src/scss/${file}.scss`,
  plugins: [
    sass({
      output: false,
      processor: (css) => processSCSS(css, `${file}.css`, `${file}.min.css`),
    }),
  ],
}));

export default [
  ...languageConfigs,
  ...scssConfigs,

  /* ********************* */
  /*      Javascript       */
  /* ********************* */
  // ES6 standalone files
  {
    input: 'src/js/sa11y.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    output: [
      { banner, file: 'dist/js/sa11y.esm.js', format: 'esm' },
      { banner, file: 'dist/js/sa11y.esm.min.js', format: 'esm', plugins: [terser()] },
    ],
  },
  // UMD standalone files
  {
    input: 'src/js/sa11y.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    output: [
      { banner, file: 'dist/js/sa11y.umd.js', format: 'umd', name: 'Sa11y' },
      { banner, file: 'dist/js/sa11y.umd.min.js', format: 'umd', name: 'Sa11y', plugins: [terser()] },
    ],
  },
  // Bookmarklet - Automatic language detection.
  {
    input: 'src/bookmarklet/v2.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/v2.js',
        format: 'umd',
        name: 'Sa11yLangBookmarklet',
        plugins: [terser()],
      },
    ],
  },
  // Bookmarklet - English.
  {
    input: 'src/bookmarklet/v2-en.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/v2-en.js',
        format: 'umd',
        name: 'Sa11yLangBookmarkletEn',
        plugins: [terser()],
      },
    ],
  },
  // Development bookmarklet.
  {
    input: 'src/bookmarklet/dev.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/dev.js',
        format: 'umd',
        name: 'Sa11yLangBookmarklet',
        plugins: [terser()],
      },
    ],
  },
  // APCA bookmarklet - Automatic language detection.
  {
    input: 'src/bookmarklet/apca.js',
    plugins: [
      nodeResolve(),
      css(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
        Sa11yVersion: JSON.stringify(pkg.version),
      }),
    ],
    output: [
      {
        file: 'bookmarklet/apca.js',
        format: 'umd',
        name: 'Sa11yLangBookmarkletAPCA',
        plugins: [terser()],
      },
    ],
  },
];
