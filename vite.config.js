import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: "../docs",
  },
  base: "",
  server: {
    port: 8080,
  },
  plugins: [tailwindcss()],
});
