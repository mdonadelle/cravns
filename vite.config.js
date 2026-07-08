// vite.config.js
// What this file does: Configures Vite — the tool that runs your
// app locally and builds it for deployment.
//
// plugins: an array of extensions that add capabilities to Vite.
// react() enables React support — JSX, component hot reloading, etc.
// tailwindcss() activates the Tailwind v4 Vite plugin — this is how
// Tailwind knows to scan your files and generate utility classes.
// In v3 this was done through PostCSS. In v4 it's done here directly.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})