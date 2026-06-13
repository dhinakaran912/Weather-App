import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// cacheDir is set to an ASCII-only path because Vite's temp file writer
// breaks when the project path contains non-ASCII characters (e.g. Japanese).
export default defineConfig({
  plugins: [react()],
  cacheDir: 'C:/vite-cache/weather-app',
})
