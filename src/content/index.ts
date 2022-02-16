function refetchMetaTags() {
	const meta: Record<string, string> = {};

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

		meta[key] = value;
	}

	console.log(meta);
}

refetchMetaTags();
new MutationObserver(refetchMetaTags).observe(document.head, {
	subtree: true,
	childList: true,
	characterData: true,
});
