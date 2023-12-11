import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path"
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import basicSsl from "@vitejs/plugin-basic-ssl";
import AutoImport from "unplugin-auto-import/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import svgLoader from "vite-svg-loader";
import { createRequire } from "module";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    // basicSsl(),
    /** 将 SVG 静态图转化为 Vue 组件 */
    svgLoader({ defaultImport: "url" }),
    /** SVG */
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "pinia"
      ],
    }),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  base: './',
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    hmr: true,
    // https: true, // 是否开启 HTTPS
    host: "0.0.0.0",
    port: 8090, // 端口号
    open: true, // 自动打开浏览器
    /** 接口代理 */
    // proxy: {
    //   "/gitee": {
    //     target: "https://gitee.com",
    //     ws: true,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/gitee/, ""),
    //   },
    // },
  },
  build: {
    /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
    chunkSizeWarningLimit: 2048,
    /** 禁用 gzip 压缩大小报告 */
    reportCompressedSize: false,
    /** 打包后静态资源目录 */
    assetsDir: "static",
    rollupOptions: {
      output: {
        /**
         * 分块策略
         * 1. 注意这些包名必须存在，否则打包会报错
         * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
         */
        manualChunks: {
          vue: ["vue", "vue-router", "pinia"],
          element: ["element-plus", "@element-plus/icons-vue"],
        }
      }
    }
  },
  // 混淆器
  esbuild: {
    pure: ["console.log"],  // 打包时移除 console.log
    drop: ["debugger"],   // 打包时移除 debugger
    legalComments: "none" // 打包时移除所有注释
  },
})
