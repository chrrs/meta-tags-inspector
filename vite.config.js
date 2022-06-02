import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	root: 'src',
	plugins: [
		tsconfigPaths({ root: '../' }),
		react({
			babel: {
				plugins: [
					'babel-plugin-macros',
					[
						'@emotion/babel-plugin-jsx-pragmatic',
						{
							export: 'jsx',
							import: '__cssprop',
							module: '@emotion/react',
						},
					],
					['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }, 'twin.macro'],
				],
			},
		}),
		viteStaticCopy({
			targets: [
				{
					src: `manifest.${process.env.MANIFEST ?? 'v2'}.json`,
					dest: '.',
					rename: 'manifest.json',
				},
			],
		}),
	],
	build: {
		polyfillModulePreload: false,
		outDir: '../dist/ext',
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
