import { defineConfig } from 'vite';
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  server: { host: '127.0.0.1', port: 5173, strictPort: false },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: { target: 'es2020', sourcemap: false },
  ssr: { noExternal: ['react-router-dom', 'react-router', '@remix-run/router'] }
});
