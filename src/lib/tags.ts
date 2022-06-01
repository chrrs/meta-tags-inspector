export class Connection {
	private port: chrome.runtime.Port | undefined;
	private tabId: number | undefined;

	onFetching: (() => void) | undefined;
	onError: ((error: string) => void) | undefined;
	onFetched: ((tags: Record<string, string>) => void) | undefined;

	private onDisconnect = () => {
		if (this.port !== undefined) {
			this.connect(this.tabId || 0);
		}
	};

	private onMessage = (message: [string, unknown]) => {
		console.log('received', message);
		if (message[0] === 'fetch:url') {
			this.onFetching && this.onFetching();
		} else if (message[0] === 'fetch:error') {
			this.onError && this.onError(message[1] as string);
		} else if (message[0] === 'fetch:tags') {
			const tags = message[1] as Record<string, string>;
			this.onFetched && this.onFetched(tags);
			console.log(tags);
		}
	};

	connect(tabId: number) {
		this.tabId = tabId;
		this.port = chrome.runtime.connect({ name: 'meta-tags-inspector' });

		this.port.onDisconnect.removeListener(this.onDisconnect);
		this.port.onDisconnect.addListener(this.onDisconnect);

		this.port.postMessage(['init', { tabId }]);

		this.port.onMessage.removeListener(this.onMessage);
		this.port.onMessage.addListener(this.onMessage);
	}

	disconnect() {
		const p = this.port;
		this.port = undefined;
		p?.disconnect();
	}

	refetch() {
		this.onFetching && this.onFetching();
		this.port?.postMessage(['refetch']);
	}
}
