import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "src"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/services": path.resolve(__dirname, "src/services"),
      "@/ui": path.resolve(__dirname, "src/ui"),
      "@/features": path.resolve(__dirname, "src/features"),
      "@/routes": path.resolve(__dirname, "src/routes"),
      "@/types": path.resolve(__dirname, "src/types"),
    },
  },
});
