import { Meta } from '$lib/meta';
import { useEffect, useReducer } from 'react';
import { useState } from 'react';

const App: React.FC = () => {
	// TODO: useState tags
	const [_, forceUpdate] = useReducer((x) => x + 1, 0);
	const [meta] = useState(new Meta());

	useEffect(() => {
		const port = chrome.runtime.connect();

		port.onMessage.addListener((message: [string, any]) => {
			meta.update(message[1] ?? {});
			forceUpdate();
		});

		port.postMessage(['init', { tabId: chrome?.devtools?.inspectedWindow?.tabId }]);

		return () => port.disconnect();
	}, [meta]);

	return (
		<>
			{Object.entries(meta.tags).map(([key, value]) => (
				<p key={key}>
					<b>{key}:</b> {value}
				</p>
			))}
		</>
	);
};

export default App;
