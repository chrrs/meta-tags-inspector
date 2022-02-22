const devtoolsTabPorts: Record<number, chrome.runtime.Port> = {};

chrome.runtime.onConnect.addListener((port) => {
	if (port?.sender?.url === chrome.runtime.getURL('/devtools/panel.html')) {
		port.onMessage.addListener(handleDevtoolsMessage);
	} else {
		port.disconnect();
	}
});

function handleDevtoolsMessage(message: [string, { tabId: number }], port: chrome.runtime.Port) {
	if (message[0] === 'init') {
		devtoolsTabPorts[message[1].tabId] = port;

		chrome.tabs.sendMessage(message[1].tabId, 'tags:request', (res) => {
			if (res !== undefined) {
				port.postMessage(['tags:update', res]);
			}
		});

		port.onDisconnect.addListener(() => {
			delete devtoolsTabPorts[message[1].tabId];
		});
	}
}

chrome.runtime.onMessage.addListener((message, sender) => {
	const tab = sender?.tab?.id;
	if (tab) {
		devtoolsTabPorts[tab]?.postMessage(message);
	}
});
