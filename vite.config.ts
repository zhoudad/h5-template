import { loadEnv } from 'vite';
import path from 'path';
import fs from 'fs';
import type { ConfigEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { visualizer } from 'rollup-plugin-visualizer'; // 查看文件比例
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

import viewport from 'postcss-mobile-forever';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    base: env.VITE_APP_PUBLIC_PATH,

    define: {
      'process.env.VUE_APP_API_BASE_URL': JSON.stringify(env.VITE_APP_API_BASE_URL),
      'process.env.VUE_APP_PUBLIC_PATH': JSON.stringify(env.VITE_APP_PUBLIC_PATH),
    },
    plugins: [
      vue(),
      visualizer(),
      Components({
        dts: true,
        resolvers: [
          TDesignResolver({
            library: 'mobile-vue',
          }),
        ],
        types: [],
      }),

      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router', 'vitest'],
        dts: true,
      }),
    ],

    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          viewport({
            // config: https://www.npmjs.com/package/postcss-mobile-forever
            appSelector: '#app',
            viewportWidth: 375,
            maxDisplayWidth: undefined,
            border: false,
            disableMobile: false,
            disableDesktop: false,
            disableLandscape: false,
          }),
        ],
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
      },
    },

    server: {
      host: true,
      https: {
        key: fs.readFileSync('keys/16-key.pem'),
        cert: fs.readFileSync('keys/16-cert.pem'),
        // mkcert -install
      },
      port: 3000,
      proxy:
        env.VITE_HTTP_MOCK === 'true'
          ? undefined
          : {
              '/api': {
                target: '',
                ws: false,
                changeOrigin: true,
              },
            },
    },
  };
};
