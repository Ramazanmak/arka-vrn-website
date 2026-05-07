import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { getStaticRoutes } from './src/site-routes'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    includedRoutes() {
      return getStaticRoutes();
    }
  }
})
