import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// El hash cambia cuando cambia cualquier locale, así que la URL del JSON
// también cambia y no puede quedar clavada en un caché immutable del deploy anterior.
const localeFiles = ["es", "en"].map((lng) =>
    readFileSync(new URL(`./public/locales/${lng}/common.json`, import.meta.url)),
);
const localesVersion = createHash("sha256").update(Buffer.concat(localeFiles)).digest("hex").slice(0, 8);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    define: {
        "import.meta.env.VITE_LOCALES_VERSION": JSON.stringify(localesVersion),
    },
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
