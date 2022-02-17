import DiscordPreview from '$components/preview/DiscordPreview';
import { Meta } from '$lib/meta';
import { Box, ChakraProvider } from '@chakra-ui/react';
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
		<ChakraProvider>
			<DiscordPreview meta={new Meta(tags)} />
			{JSON.stringify(tags)}
		</ChakraProvider>
	);
};

export default App;
