import { ManifestV2 } from 'rollup-plugin-chrome-extension';

export default {
	manifest_version: 2,
	devtools_page: 'devtools/devtools.html',
	content_scripts: [
		{
			js: ['content/index.ts'],
			matches: ['https://*/*', 'http://*/*'],
		},
	],
	web_accessible_resources: ['devtools/index.html'],
	background: {
		scripts: ['background.ts'],
	},
} as ManifestV2;
