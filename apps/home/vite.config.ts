import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solid(), 
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      emitFile: true,
      filename: "stats.html",
    })
  ],
})
