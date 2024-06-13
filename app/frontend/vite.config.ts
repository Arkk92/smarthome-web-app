import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    fs: {
      cachedChecks: false
    },
    host: true,
    port: 8080, // This is the port which we will use in docker
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    // {
    //   '@': fileURLToPath(new URL('./src', import.meta.url))
    // }
  }
})
