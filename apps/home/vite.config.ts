import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    solid(), 
    tsconfigPaths(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      emitFile: true,
      filename: "stats.html",
    })
  ],
})
