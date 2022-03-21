import { debounce } from '$lib/debounce';
import cheerio from 'cheerio';

const tabPorts: Record<number, chrome.runtime.Port> = {};
const urlCache: Record<number, string> = {};

type CustomPort = chrome.runtime.Port & { tabId: number };

function handleDevtoolsMessage(message: [string, { tabId: number }], port: CustomPort) {
	if (message[0] === 'init') {
		const tabId = message[1].tabId;
		port.tabId = tabId;

		tabPorts[tabId] = port;
		chrome.tabs.get(tabId, (tab) => {
			const url = tab.url;
			if (url) {
				tryRefetchTags(tabId, url, port, false);
			}
		});

		port.onDisconnect.addListener(() => {
			delete tabPorts[tabId];
			delete urlCache[tabId];
		});
	} else if (message[0] === 'refetch') {
		if (port.tabId) {
			chrome.tabs.get(port.tabId, (tab) => {
				const url = tab.url;
				if (url) {
					refetchTags(url, port);
				}
			});
		}
	}
}

async function refetchTags(url: string, port: chrome.runtime.Port) {
	try {
		// TODO: Fetching here requires the <all_urls> permission.
		// Is there a better way to do this?
		const response = await fetch(url);

		const contentType = response.headers.get('Content-Type');
		if (!contentType || !contentType?.startsWith('text/html')) {
			throw new Error(`Response was not HTML.`);
		}

		const body = await response.text();
		const $ = cheerio.load(body);

		const tags: Record<string, string> = {
			'<url>': url,
		};

		const title = $('title').text();
		if (title) {
			tags['<title>'] = title;
		}

		for (const tag of $('meta')) {
			const el = $(tag);
			const key = el.attr('name') ?? el.attr('property') ?? el.attr('itemprop');
			const value = el.attr('content');

			if (!key || !value) {
				continue;
			}

			tags[key] = value;
		}

		port.postMessage(['fetch:tags', tags]);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		port.postMessage(['fetch:error', e.toString()]);
	}
}

const debouncedRefetchTags = debounce(refetchTags, 300);

async function tryRefetchTags(
	tabId: number,
	url: string,
	port: chrome.runtime.Port,
	debounce = true
) {
	const previousUrl = urlCache[tabId];
	if (previousUrl != url) {
		urlCache[tabId] = url;

		port.postMessage(['fetch:url', url]);

		if (debounce) {
			debouncedRefetchTags(url, port);
		} else {
			refetchTags(url, port);
		}
	}
}

chrome.runtime.onConnect.addListener((port) => {
	if (port?.name === 'meta-tags-inspector') {
		port.onMessage.addListener((message, port) =>
			handleDevtoolsMessage(message, port as CustomPort)
		);
	} else {
		port.disconnect();
	}
});

chrome.tabs.onUpdated.addListener((tabId, changes, tab) => {
	console.log(tabId, changes);

	const port = tabPorts[tabId];
	const url = tab.url;
	if (port && url) {
		tryRefetchTags(tabId, url, port);
	}
});

chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
	// We're only using this message to wake up the service worker.
	sendResponse({});
});
