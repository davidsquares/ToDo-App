import { defineConfig } from "vite";

export default defineConfig({
    base: '/05-ToDo-App/',
    build: {
        outDir: 'docs', // Exporta los archivos a la carpeta docs
    },
});