import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Manual chunking strategy
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            // Har library ka apna chunk ban jayega (e.g., vendor-react.js)
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    // Warning limit ko thora barha sakte hain agar zarurat ho (optional)
    chunkSizeWarningLimit: 1000,
  },
});
