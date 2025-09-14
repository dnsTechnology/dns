/* eslint-disable no-undef */
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // Set the output folder to your cPanel public_html
    //outDir: "/home/dnstech/public_html", //production
     outDir: "dist", //development
    emptyOutDir: false, // ⚠️ set false to avoid deleting other files like PHP or Next.js configs
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
});
