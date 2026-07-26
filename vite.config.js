import { defineConfig } from 'vite';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig({
  root: 'src',
  build: {
    sourcemap: true,
    outDir: '../dist',
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [
        SortCss({
          sort: 'mobile-first',
        }),
      ],
    },
  },
});
