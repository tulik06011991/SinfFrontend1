import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode'],
  },
  server: {
    proxy: {
      '/': {
        target: 'https://sinfbackend2.onrender.com', // Backend URL manzilingiz
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
