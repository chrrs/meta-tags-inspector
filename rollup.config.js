import path from 'path';

import { defineConfig } from 'rollup';

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { emptyDir } from 'rollup-plugin-empty-dir';
import zip from 'rollup-plugin-zip';
import progress from 'rollup-plugin-progress';
import serve from 'rollup-plugin-serve';

const isProduction = process.env.NODE_ENV === 'production';

const getConfig = (version) =>
	defineConfig({
		input: `src/manifest.${version}.ts`,
		output: {
			dir: 'dist/' + version,
			format: 'esm',
			chunkFileNames: path.join('chunks', '[name]-[hash].js'),
		},
		plugins: [
			progress(),
			chromeExtension(),
			simpleReloader(),
			replace({
				preventAssignment: true,
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			}),
			typescript(),
			resolve(),
			commonjs(),
			emptyDir(),
			!isProduction && serve('dist/v3/devtools'),
			isProduction && zip({ dir: 'releases/' + version }),
		],
	});

const configs = [getConfig('v3'), getConfig('v2')];
export default configs;
