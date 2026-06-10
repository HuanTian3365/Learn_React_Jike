import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { visualizer } from "rollup-plugin-visualizer";
import cdnImport from "vite-plugin-cdn-import";

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: "https://geek.itheima.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    // cdnImport({
    //   modules: [
    //     {
    //       name: "react",
    //       var: "React",
    //       path: "umd/react.production.min.js",
    //       version: "19.2.6",
    //     },
    //     {
    //       name: "react-dom",
    //       var: "ReactDOM",
    //       path: "umd/react-dom.production.min.js",
    //       version: "19.2.6",
    //     },
    //   ],
    // }),
    react(),
    visualizer({
      open: true,
      filename: "stats.html",
    }),
  ],
});
