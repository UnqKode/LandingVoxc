import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".",  // Ensure Vite starts from the frontend directory
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
