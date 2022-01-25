import { ManifestV3 } from 'rollup-plugin-chrome-extension';

export default {
	manifest_version: 3,
	devtools_page: 'devtools/devtools.html',
	web_accessible_resources: [
		{
			resources: ['devtools/index.html'],
			matches: ['*://*/*'],
		},
	],
} as ManifestV3;
