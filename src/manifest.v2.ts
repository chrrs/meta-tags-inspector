import { ManifestV2 } from 'rollup-plugin-chrome-extension';

export default {
	manifest_version: 2,
	devtools_page: 'devtools/devtools.html',
	web_accessible_resources: ['devtools/index.html'],
} as ManifestV2;
