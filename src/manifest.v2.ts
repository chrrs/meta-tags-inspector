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
	web_accessible_resources: ['devtools/panel.html'],
	background: {
		scripts: ['background.ts'],
	},
	icons: Object.fromEntries(
		[16, 32, 48, 64, 96, 128, 256].map((size) => [
			size.toString(),
			`assets/favicon-${size}x${size}.png`,
		])
	),
} as ManifestV2;
