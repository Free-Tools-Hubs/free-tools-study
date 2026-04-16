import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('studyTopics.json')) {
            return 'study-data';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }

      }
    }
  }
})
