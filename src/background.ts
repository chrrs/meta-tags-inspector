const devtoolsTabPorts: Record<number, chrome.runtime.Port> = {};

chrome.runtime.onConnect.addListener((port) => {
	if (port?.sender?.url === chrome.runtime.getURL('/devtools/index.html')) {
		port.onMessage.addListener(handleDevtoolsMessage);
	} else {
		port.disconnect();
	}
});

function handleDevtoolsMessage(message: [string, any], port: chrome.runtime.Port) {
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
	let tab = sender?.tab?.id;
	console.log(tab);
	if (tab) {
		devtoolsTabPorts[tab]?.postMessage(message);
	}
});
