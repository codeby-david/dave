import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH ||"/codeby-david/dave",
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'EVAL' || warning.id?.includes('lottie.js')) return;
        warn(warning);
      },
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          framer: ['framer-motion'],
          bvh: ['three-mesh-bvh'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  }
});