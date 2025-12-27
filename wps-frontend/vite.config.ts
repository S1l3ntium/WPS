import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

const getHttpsConfig = () => {
	// Если переданы пути к сертификатам, используем их
	if (process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
		return {
			key: fs.readFileSync(process.env.SSL_KEY_PATH),
			cert: fs.readFileSync(process.env.SSL_CERT_PATH),
		}
	}
	// Иначе HTTPS отключен (undefined)
	return undefined
}

export default defineConfig({
	plugins: [
		// The React and Tailwind plugins are both required for Make, even if
		// Tailwind is not being actively used – do not remove them
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			// Alias @ to the src directory
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '127.0.0.1',
		port: 5173,
		allowedHosts: ['worldpublicsummit.test', 'localhost', '127.0.0.1'],
		hmr: {
			protocol: 'ws',
			host: 'localhost',
			port: 5173,
		},
		proxy: {
			'/api': {
				target: process.env.VITE_API_URL || 'http://localhost:8000',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
		watch: {
			usePolling: true,
			interval: 100,
		},
	},
})
