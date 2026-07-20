import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Base path relatif agar bisa dibuka di subfolder (mis. GitHub Pages).
  // Kalau deploy ke root domain (Netlify/Vercel), boleh ganti ke '/'.
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        voltify: resolve(__dirname, 'projects/voltify.html'),
        tabemono: resolve(__dirname, 'projects/tabemono.html'),
        bikinevent: resolve(__dirname, 'projects/bikinevent.html'),
        ecosky: resolve(__dirname, 'projects/ecosky.html'),
      },
    },
  },
})
