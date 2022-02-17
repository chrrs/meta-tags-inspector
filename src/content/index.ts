let tags: Record<string, string> = {};

function refetchMetaTags() {
	tags = {};
	const titleElement = document.head.getElementsByTagName('title')[0];
	if (titleElement) {
		tags['<url>'] = window.location.toString();
		tags['<title>'] = titleElement.innerHTML;
	}

	for (const tag of document.head.querySelectorAll('meta')) {
		const key = tag.getAttribute('name') ?? tag.getAttribute('property');
		const value = tag.getAttribute('content');

		if (!key || !value) {
			continue;
		}

		tags[key] = value;
	}

	chrome.runtime.sendMessage(['tags:update', tags]);
}

new MutationObserver(refetchMetaTags).observe(document.head, {
	subtree: true,
	childList: true,
	characterData: true,
});

if (document.readyState !== 'complete') {
	window.addEventListener('load', refetchMetaTags);
} else {
	refetchMetaTags();
}

window.addEventListener('focus', refetchMetaTags);

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
	if (message === 'tags:request') {
		sendResponse(tags);
	}
});
