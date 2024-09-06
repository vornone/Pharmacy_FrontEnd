// electron.vite.config.mjs
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var __electron_vite_injected_dirname = "D:\\JAVASCRIPT\\pharmarcy_frontend\\pharmarcy_frontend";
var electron_vite_config_default = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"]
  },
  server: {
    port: 3e3,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    }
  },
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/main"
    },
    rollupOptions: {
      input: {
        index: resolve(__electron_vite_injected_dirname, "electron/main/index.js")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/preload"
    },
    rollupOptions: {
      input: {
        index: resolve(__electron_vite_injected_dirname, "electron/preload/index.js")
      }
    }
  },
  renderer: {
    build: {
      outDir: "dist/renderer"
    },
    rollupOptions: {
      input: {
        index: resolve(__electron_vite_injected_dirname, "electron/renderer/index.js")
      }
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react()]
  }
});
export {
  electron_vite_config_default as default
};
