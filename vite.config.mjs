import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    fs: {
      allow: ['.'],
    },
    historyApiFallback: true, // 👈 THIS is what ensures routing works
  }
});
