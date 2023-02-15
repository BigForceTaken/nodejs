import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        //代理api
        target: "http://localhost:3000/", //服务器api地址
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
