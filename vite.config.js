import { defineConfig } from 'vite';
import pkg from './package.json';
import { injectCSSintoJS } from './build/utils.js';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
    Sa11yVersion: JSON.stringify(pkg.version),
  },
  plugins: [
    injectCSSintoJS(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    open: '/sandbox/dev.html',
    strictPort: true,
  },
});
