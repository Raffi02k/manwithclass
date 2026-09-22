import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://www.manwithclass.se');
  return {
    define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
    esbuild: { jsx: 'automatic' },
    server: { host: '127.0.0.1', port: 5173, strictPort: false },
    preview: { host: '127.0.0.1', port: 4173, strictPort: true },
    build: { target: 'es2020', sourcemap: false },
    ssr: { noExternal: ['react-router-dom', 'react-router', '@remix-run/router'] }
  };
});
