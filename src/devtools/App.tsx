import DiscordPreview from '$components/preview/DiscordPreview';
import { TwitterPreview } from '$components/preview/TwitterPreview';
import { Meta } from '$lib/meta';
import { RepeatIcon } from '@chakra-ui/icons';
import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';

let port: chrome.runtime.Port | null = null;

const App: React.VFC = () => {
	const [fetching, setFetching] = useState(true);
	const [tags, setTags] = useState<Record<string, string>>({});

	function refetch() {
		setFetching(true);
		port?.postMessage(['refetch']);
	}

	if (chrome?.runtime) {
		useEffect(() => {
			port = chrome.runtime.connect({
				name: 'meta-tags-inspector',
			});

			port.onMessage.addListener((message: [string, unknown]) => {
				console.log('received', message);
				if (message[0] === 'fetch:url') {
					setFetching(true);

					const url = message[1] as string;
					setTags({ '<url>': url });
				} else if (message[0] === 'fetch:error') {
					setFetching(false);
					// TODO: Do something
				} else if (message[0] === 'fetch:tags') {
					setFetching(false);
					setTags(message[1] as Record<string, string>);
				}
			});

			port.postMessage(['init', { tabId: chrome?.devtools?.inspectedWindow?.tabId }]);

			return () => port?.disconnect();
		}, []);
	}

	return (
		<ChakraProvider>
			<Box fontSize="sm">
				<Flex px={4} py={2} gap={2} bg="gray.100" align="center" justify="space-between">
					<Text>
						<b>Note: </b>
						Previews are not always 100% accurate. Make sure to check manually if
						necessary.
					</Text>

					<Button
						flexShrink="0"
						size="xs"
						leftIcon={<RepeatIcon />}
						loadingText="Fetching..."
						colorScheme="blue"
						isLoading={fetching}
						onClick={() => refetch()}
					>
						Refetch tags
					</Button>
				</Flex>
				<Flex p={4} gap={4} direction={{ base: 'column', xl: 'row' }}>
					<Box flex="1">
						<DiscordPreview meta={new Meta(tags)} />
					</Box>
					<Box flex="1">
						<TwitterPreview meta={new Meta(tags)} />
					</Box>
				</Flex>
				{JSON.stringify(tags)}
			</Box>
		</ChakraProvider>
	);
};

export default App;
