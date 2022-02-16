import { ManifestV3 } from 'rollup-plugin-chrome-extension';

export default {
	manifest_version: 3,
	devtools_page: 'devtools/devtools.html',
	content_scripts: [
		{
			js: ['content/index.ts'],
			matches: ['https://*/*', 'http://*/*'],
		},
	],
	web_accessible_resources: [
		{
			resources: ['devtools/index.html'],
			matches: ['*://*/*'],
		},
	],
} as ManifestV3;