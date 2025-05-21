import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  publicDir: "public",
  server: {
    fs: {
      allow: [".", "public"]
    }
  },
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'app')}/`,
    }
  }
});
