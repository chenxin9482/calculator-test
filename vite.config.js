import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function _resolve(dir) {
  return path.resolve(__dirname, dir);
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": _resolve("src"),
    },
  },
});
