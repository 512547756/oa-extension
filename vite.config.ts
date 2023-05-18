import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
import {
  OUTPUT_DIR,
  reportCompressedSize,
  chunkSizeWarningLimit,
  terserOptions,
  rollupOptions
} from './build/constant'

export default ({ mode }: any) =>
  defineConfig({
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    plugins: [
      vue(),
      vueJsx(),
      // 压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "${path.resolve(__dirname, 'src/assets/css/mixins/_main.less')}";`,
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 开发服务器配置
    server: {
      host: true,
      cors: true,
      open: true,
      port: Number(loadEnv(mode, process.cwd()).VITE_DEV_PORT),
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/api': {
          // @ts-ignore
          target: loadEnv(mode, process.cwd()).VITE_APP_SERVER_URL,
          changeOrigin: true,
          ws: true, //websocket支持
          secure: true, // 如果是https接口，需要配置这个参数
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    // 打包配置
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      minify: 'terser', // 如果需要用terser混淆，可打开这两行
      terserOptions: terserOptions,
      rollupOptions: rollupOptions,
      reportCompressedSize: reportCompressedSize,
      chunkSizeWarningLimit: chunkSizeWarningLimit
    }
  })
