import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isAnalyze = process.env['ANALYZE'] === 'true';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      // Bundle analyzer - generates stats.html when ANALYZE=true
      isAnalyze && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    define: {
      'process.env.API_KEY': JSON.stringify(env['GEMINI_API_KEY']),
      'process.env.GEMINI_API_KEY': JSON.stringify(env['GEMINI_API_KEY'])
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Optimize bundle size
      target: 'es2020',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Critical Vendor (React Core) to start app
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            // Critical Animation Engine (Used in Preloader & Hero)
            'framer-motion': ['framer-motion'],
            'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
            // AI and analytics
            'external-services': ['@google/genai', '@vercel/analytics'],
            // Heavy illustration library (2MB+) - MUST be lazy loaded
            'vendor-heavy': ['react-peeps'],
          },
        },
      },
      // Chunk size warning threshold
      // react-peeps is ~2MB but lazy-loaded, so we accept larger chunks
      chunkSizeWarningLimit: 2100,
    },
  };
});
