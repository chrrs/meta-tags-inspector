chrome.devtools.panels.create(
	'Meta tags',
	chrome.devtools.panels.themeName == 'dark'
		? '/devtools/panel-dark.svg'
		: '/devtools/panel-light.svg',
	'/devtools/panel.html'
);
