import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 9000,
    host: true,
    open: true,
    proxy: {
      "/dev-api": {
        target: 'http://127.0.0.1:30001',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, "/api"),
      },
    }
  },

  plugins: [react()],
})
