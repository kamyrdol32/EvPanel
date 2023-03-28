import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker Container port mapping to work
        strictPort: true,
        port: 3001, // you can replace this port with any port
        proxy: {
            '/auth': {
                target: 'http://evpanel-backend:5001',
                changeOrigin: true,
            },
            '/api': {
                target: 'http://evpanel-backend:5001',
                changeOrigin: true,
            }
        }
    }
})