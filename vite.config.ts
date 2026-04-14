import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const rootDir = path.dirname(fileURLToPath(new URL(import.meta.url)));
const mobileLayoutConfigPath = path.join(rootDir, 'src/config/mobile-layout.json');

function mobileLayoutSavePlugin() {
  return {
    name: 'mobile-layout-save',
    configureServer(server: { middlewares: { use: (handler: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || req.url !== '/__save-mobile-layout') {
          next();
          return;
        }

        let body = '';

        req.on('data', (chunk: Buffer | string) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body);
            await writeFile(mobileLayoutConfigPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : 'No se pudo guardar',
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mobileLayoutSavePlugin()],
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
