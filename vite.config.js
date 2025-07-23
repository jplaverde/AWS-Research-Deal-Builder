import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['file-saver', 'docx']
  },
  build: {
    rollupOptions: {
      external: ['docx', 'file-saver']
    }
  }
});
