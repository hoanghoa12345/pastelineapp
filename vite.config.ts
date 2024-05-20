import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      Components({
        dirs: ["./src/components"],
      }),
      AutoImport({
        dts: true,
        dirs: ["./src/composables", "./src/stores"],
        imports: ["vue", "vue-router"],
      }),
    ],
    resolve: {
      alias: {
        "@/": "/src/",
      },
    },
    server: {
      port: 5173,
    },
  };
});
