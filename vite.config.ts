import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    host: true,
    port: 80,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "sass:math";@import "@/scss/mixins.scss";',
      },
    },
  },
});
