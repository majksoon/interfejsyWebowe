import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // **NO** root/outDir overrides here: we want the default project root
});
