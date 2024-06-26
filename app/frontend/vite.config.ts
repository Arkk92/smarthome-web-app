import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/smart-home/', // Adjust this to your desired base path
  server: {
    fs: {
      cachedChecks: false
    },
    host: true,
    port: 8080, // This is the port which we will use in docker,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      port: 8080, // Port where Vite's dev server runs
    }
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    // {
    //   '@': fileURLToPath(new URL('./src', import.meta.url))
    // }
  }
})
