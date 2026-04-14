import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf('node_modules/@react-three/drei') !== -1 || id.indexOf('node_modules/three-stdlib') !== -1) {
            return 'three-helpers';
          }

          if (id.indexOf('node_modules/@react-three/fiber') !== -1) {
            return 'fiber-vendor';
          }

          if (id.indexOf('node_modules/three') !== -1) {
            return 'three-core';
          }

          if (id.indexOf('node_modules/react') !== -1 || id.indexOf('node_modules/scheduler') !== -1) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});
