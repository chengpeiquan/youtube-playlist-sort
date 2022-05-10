import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import pkg from './package.json'

const resolve = (dir: string): string => path.resolve(__dirname, dir)
const isDev = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  base: isDev ? '/' : '/youtube-playlist-sort/',

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      // 兼容webpack的习惯
      '@': resolve('src'),
      '@img': resolve('src/assets/img'),
      '@less': resolve('src/assets/less'),
      '@libs': resolve('src/libs'),
      '@cp': resolve('src/components'),
      '@views': resolve('src/views'),
      // 兼容webpack的静态资源
      '~@': resolve('src'),
      '~@img': resolve('src/assets/img'),
      '~@less': resolve('src/assets/less'),
      '~@libs': resolve('src/libs'),
      '~@cp': resolve('src/components'),
      '~@views': resolve('src/views'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#1890ff',
          hack: `true; @import '@less/config.less'`,
        },
      },
    },
  },

  plugins: [
    vue(),
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author}\n */`
    ),
  ],
})
