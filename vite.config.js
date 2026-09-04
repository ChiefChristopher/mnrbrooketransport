import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3050,
    host: true,
    allowedHosts: ['www.mnrbrooketransport.com', 'mnrbrooketransport.com']
  },
  preview: {
    port: 3050,
    host: true,
    allowedHosts: ['www.mnrbrooketransport.com', 'mnrbrooketransport.com']
  }
})
