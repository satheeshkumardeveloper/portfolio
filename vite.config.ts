import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: '/portfolio/', // Set the base path conditionally
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));

