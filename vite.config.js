import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from "vite-plugin-mock"
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      '@comps': path.resolve(__dirname, "src/components"),
      '@apis': path.resolve(__dirname, "src/network"),
      '@views': path.resolve(__dirname, "src/views"),
      '@router': path.resolve(__dirname, "src/router"),
      '@store': path.resolve(__dirname, "src/store"),
      '@static': path.resolve(__dirname, "src/static"),
    },
  },
  plugins: [vue(), viteMockServe({
    supportTs: true     //如果使用 js发开，则需要配置 supportTs 为 false
})],
  server: {
    open: true,//启动项目自动弹出浏览器
    port: 3000,//启动端口
    proxy: {
      '/api': 'https://animechan.vercel.app' 
    }
  }
})
