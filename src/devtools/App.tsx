import { useEffect } from 'react';
import { useState } from 'react';

const App: React.FC = () => {
	const [tags, setTags] = useState<Record<string, string>>({});

	useEffect(() => {
		const port = chrome.runtime.connect();

		port.onMessage.addListener((message: [string, any]) => {
			setTags(message[1]);
		});

		port.postMessage(['init', { tabId: chrome?.devtools?.inspectedWindow?.tabId }]);

		return () => port.disconnect();
	}, []);

	return (
			{Object.entries(tags).map(([key, value]) => (
				<p key={key}>
					<b>{key}:</b> {value}
				</p>
			))}
		<ChakraProvider>
		</ChakraProvider>
	);
};

export default App;
