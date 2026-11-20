import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
        include: ["framer-motion"],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes("node_modules")) return;
                    if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) return "motion";
                    if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) return "react";
                    if (id.includes("i18next") || id.includes("intl-messageformat")) return "i18n";
                    return "vendor";
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
