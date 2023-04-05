import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Set the base URL to a relative path
    base: './',
    outDir: 'build' // Add this line to set the output directory
  },
})