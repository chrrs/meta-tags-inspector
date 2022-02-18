import DiscordPreview from '$components/preview/DiscordPreview';
import { Meta } from '$lib/meta';
import { Box, ChakraProvider, Flex, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';

const App: React.FC = () => {
	const [tags, setTags] = useState<Record<string, string>>({});

	if (chrome?.runtime) {
		useEffect(() => {
			const port = chrome.runtime.connect();

			port.onMessage.addListener((message: [string, any]) => {
				setTags(message[1]);
			});

			port.postMessage(['init', { tabId: chrome?.devtools?.inspectedWindow?.tabId }]);

			return () => port.disconnect();
		}, []);
	}

	return (
		<ChakraProvider>
			<Box fontSize="sm">
				<Flex px={4} py={2} bg="gray.100">
					<Text>
						<b>Note: </b>
						Previews are not always 100% accurate. Make sure to check manually if
						necessary.
					</Text>
				</Flex>
				<Flex p={4} gap={4}>
					<Box flexGrow="1">
						<DiscordPreview meta={new Meta(tags)} />
					</Box>
					<Box flexGrow="1">
						<DiscordPreview meta={new Meta(tags)} />
					</Box>
				</Flex>
				{JSON.stringify(tags)}
			</Box>
		</ChakraProvider>
	);
};

export default App;
