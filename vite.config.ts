import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The site is published to GitHub Pages at https://adrianeyre.github.io/pipeline/,
 * which is a sub-path rather than a domain root. A relative base emits asset
 * URLs that resolve correctly there and from a local `vite preview` alike, so
 * the published path never has to be repeated here.
 */
export default defineConfig({
	base: './',
	plugins: [react()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		host: true,
		port: 3000,
		open: false,
	},
	preview: {
		host: true,
		port: 4173,
	},
	build: {
		// `dist-web`, not `dist`: the release workflow uploads this directory as
		// the Pages artifact.
		outDir: 'dist-web',
		emptyOutDir: true,
		sourcemap: true,
		target: 'es2022',
	},
});
