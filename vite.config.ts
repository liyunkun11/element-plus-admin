import process from "node:process";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ep-admin/",
  server: {
    port: 7788,
    open: true,
    host: true,
    proxy: {
      "/api/ep-admin": {
        target: loadEnv("development", process.cwd()).VITE_APP_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/api\/ep-admin/, ""),
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: false })],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "./src/icons")],
      symbolId: "icon-[dir]/[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: "true; @import \"@/styles/var.less\";",
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
  },
});
