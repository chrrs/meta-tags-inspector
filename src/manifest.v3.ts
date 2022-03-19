import { ManifestV3 } from 'rollup-plugin-chrome-extension';

export default {
	manifest_version: 3,
	devtools_page: 'devtools/devtools.html',
	web_accessible_resources: [
		{
			resources: ['devtools/panel.html'],
			matches: ['*://*/*'],
		},
	],
	permissions: ['tabs'],
	host_permissions: ['<all_urls>'],
	background: {
		service_worker: 'background.ts',
	},
	icons: Object.fromEntries(
		[16, 32, 48, 64, 96, 128, 256].map((size) => [
			size.toString(),
			`assets/favicon-${size}x${size}.png`,
		])
	),
} as ManifestV3;
