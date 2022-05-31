import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	root: 'src',
	plugins: [tsconfigPaths({ root: '../' })],
	build: {
		polyfillModulePreload: false,
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				devtools: resolve(__dirname, 'src/devtools/index.html'),
				panel: resolve(__dirname, 'src/devtools/panel.html'),
				background: resolve(__dirname, 'src/background.ts'),
			},
			output: {
				entryFileNames: '[name].js',
			},
		},
	},
});
