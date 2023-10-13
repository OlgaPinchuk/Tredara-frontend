import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    target: "esnext",
  },
  server: {
    // https: false,
    // watch: {
    //   usePolling: true,
    // },
    host: true, // needed for the Docker Container port mapping to work
    // strictPort: true,
    port: 5173, // you can replace this port with any port
    // proxy: {
    //   "/api": {
    //     target: "http://51.20.42.71:8080",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
