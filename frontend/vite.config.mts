import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // The backend's port lives in the repo-root .env.
  const env = loadEnv(mode, '..', '');
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: `http://localhost:${env.PORT || 4000}`,
          changeOrigin: true,
        },
      },
    },
  };
});
