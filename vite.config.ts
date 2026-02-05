import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), glsl()],
    optimizeDeps: {
        include: ['framer-motion', 'three']
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    }
});
