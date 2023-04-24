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
import pkg from './package.json';

/**
 * Reusable function to process SCSS files.
 * @param {string} input - Input SCSS file path.
 * @param {string} output - Output CSS file path.
 * @param {string} outputMin - Output minified CSS file path.
 * @returns {Promise<string>} - Empty string.
 */
const processSCSS = async (input, output, outputMin) => {
  const result = await postcss().process(input, { from: undefined });
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

export default [
  /* ********************* */
  /*      SCSS files       */
  /* ********************* */
  {
    input: 'src/scss/sa11y.scss',
    plugins: [
      sass({
        output: false,
        processor: (css) => processSCSS(css, 'sa11y.css', 'sa11y.min.css'),
      }),
    ],
  },
  // Control panel
  {
    input: 'src/scss/control-panel.scss',
    plugins: [
      sass({
        output: false,
        processor: (css) => processSCSS(css, 'control-panel.css', 'control-panel.min.css'),
      }),
    ],
  },
  // Shared
  {
    input: 'src/scss/shared.scss',
    plugins: [
      sass({
        output: false,
        processor: (css) => processSCSS(css, 'shared.css', 'shared.min.css'),
      }),
    ],
  },
  // Annotations
  {
    input: 'src/scss/annotations.scss',
    plugins: [
      sass({
        output: false,
        processor: (css) => processSCSS(css, 'annotations.css', 'annotations.min.css'),
      }),
    ],
  },
  // Tooltips
  {
    input: 'src/scss/tooltips.scss',
    plugins: [
      sass({
        output: false,
        processor: (css) => processSCSS(css, 'tooltips.css', 'tooltips.min.css'),
      }),
    ],
  },
  // Global utilies injected into all shadowDOMs
  {
    input: 'src/scss/global-utilities.scss',
    plugins: [
      sass({
        output: false,
        processor: (css) => processSCSS(css, 'global-utilities.css', 'global-utilities.min.css'),
      }),
    ],
  },

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
      { file: 'dist/js/sa11y.esm.js', format: 'esm' },
      { file: 'dist/js/sa11y.esm.min.js', format: 'esm', plugins: [terser()] },
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
      { file: 'dist/js/sa11y.umd.js', format: 'umd', name: 'Sa11y' },
      { file: 'dist/js/sa11y.umd.min.js', format: 'umd', name: 'Sa11y', plugins: [terser()] },
    ],
  },

  /* ********************* */
  /*    Language files     */
  /* ********************* */

  // English
  {
    input: 'src/js/lang/en.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/en.js', format: 'esm' },
    ],
  },
  {
    input: 'src/js/lang/en.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/en.umd.js', format: 'umd', name: 'Sa11yLangEn' },
    ],
  },

  // French
  {
    input: 'src/js/lang/fr.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/fr.js', format: 'esm' },
    ],
  },
  {
    input: 'src/js/lang/fr.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/fr.umd.js', format: 'umd', name: 'Sa11yLangFr' },
    ],
  },

  // Polish
  {
    input: 'src/js/lang/pl.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/pl.js', format: 'esm' },
    ],
  },
  {
    input: 'src/js/lang/pl.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/pl.umd.js', format: 'umd', name: 'Sa11yLangPl' },
    ],
  },

  // Ukrainian
  {
    input: 'src/js/lang/ua.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/ua.js', format: 'esm' },
    ],
  },
  {
    input: 'src/js/lang/ua.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/ua.umd.js', format: 'umd', name: 'Sa11yLangUa' },
    ],
  },

  // Swedish
  {
    input: 'src/js/lang/sv.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/sv.js', format: 'esm' },
    ],
  },
  {
    input: 'src/js/lang/sv.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/sv.umd.js', format: 'umd', name: 'Sa11yLangSv' },
    ],
  },

  // German
  {
    input: 'src/js/lang/de.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/de.js', format: 'esm' },
    ],
  },
  {
    input: 'src/js/lang/de.js',
    plugins: [nodeResolve()],
    output: [
      { file: 'dist/js/lang/de.umd.js', format: 'umd', name: 'Sa11yLangDe' },
    ],
  },

  /* ********************* */
  /*      Bookmarklets     */
  /* ********************* */
  {
    input: 'src/bookmarklet/sa11y-en.js',
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
      { file: 'bookmarklet/sa11y-en.js', format: 'umd', name: 'Sa11y (En)', plugins: [terser()] },
    ],
  },
  {
    input: 'src/bookmarklet/fr.js',
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
      { file: 'bookmarklet/fr.js', format: 'umd', name: 'Sa11y (Fr)', plugins: [terser()] },
    ],
  },
  {
    input: 'src/bookmarklet/pl.js',
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
      { file: 'bookmarklet/pl.js', format: 'umd', name: 'Sa11y (Pl)', plugins: [terser()] },
    ],
  },
  {
    input: 'src/bookmarklet/sv.js',
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
      { file: 'bookmarklet/sv.js', format: 'umd', name: 'Sa11y (Sv)', plugins: [terser()] },
    ],
  },
  {
    input: 'src/bookmarklet/ua.js',
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
      { file: 'bookmarklet/ua.js', format: 'umd', name: 'Sa11y (Ua)', plugins: [terser()] },
    ],
  },
  {
    input: 'src/bookmarklet/de.js',
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
      { file: 'bookmarklet/de.js', format: 'umd', name: 'Sa11y (De)', plugins: [terser()] },
    ],
  },
];
