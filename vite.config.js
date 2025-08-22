import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            react(),
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.jsx'],
                refresh: true,
            }),
        ],
        server: {
            host: "0.0.0.0", // allow access inside Docker
            port: 5173,
            strictPort: true,
            hmr: {
                host: "localhost", // this is for your browser connecting
            },
        },
    };
});
