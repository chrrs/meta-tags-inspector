import Header from '$components/Header';
import DiscordPreview from '$components/preview/DiscordPreview';
import { TwitterPreview } from '$components/preview/TwitterPreview';
import { Meta } from '$lib/meta';
import { Box, ChakraProvider, Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';

let port: chrome.runtime.Port | null = null;

function connect() {
	chrome.runtime.sendMessage({});
	port = chrome.runtime.connect({
		name: 'meta-tags-inspector',
	});

	port.onDisconnect.addListener(() => {
		if (port != null) {
			connect();
		}
	});

	port.postMessage(['init', { tabId: chrome?.devtools?.inspectedWindow?.tabId }]);
}

function disconnect() {
	const p = port;
	port = null;
	p?.disconnect();
}

const App: React.VFC = () => {
	const [fetching, setFetching] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [tags, setTags] = useState<Record<string, string>>({});

	function refetch() {
		setFetching(true);
		setError(null);
		port?.postMessage(['refetch']);
	}

	if (chrome?.runtime) {
		useEffect(() => {
			connect();

			const messageListener = (message: [string, unknown]) => {
				console.log('received', message);
				if (message[0] === 'fetch:url') {
					setFetching(true);
					setError(null);

					const url = message[1] as string;
					setTags({ '<url>': url });
				} else if (message[0] === 'fetch:error') {
					setFetching(false);
					setError(message[1] as string);
				} else if (message[0] === 'fetch:tags') {
					setFetching(false);

					const tags = message[1] as Record<string, string>;
					setTags(tags);
					console.log(tags);
				}
			};
			port?.onMessage?.addListener(messageListener);

			return () => {
				port?.onMessage.removeListener(messageListener);
				disconnect();
			};
		}, []);
	}

	return (
		<ChakraProvider>
			<Flex w="100vw" h="100vh" direction="column" fontSize="sm">
				<Header fetching={fetching} onRefetch={() => refetch()} />
				<Box
					flex={1}
					/* TODO: This could cause some things to go offscreen */
					overflowX="hidden"
					/* TODO: This causes the error message to sometimes be offscreen, because scroll isn't reset */
					overflowY={fetching || error ? 'hidden' : 'auto'}
					position="relative"
				>
					<Flex
						position="absolute"
						top={0}
						left={0}
						right={0}
						p={4}
						gap={4}
						direction={{ base: 'column', xl: 'row' }}
					>
						<Box flex="1">
							<DiscordPreview meta={new Meta(tags)} />
						</Box>
						<Box flex="1">
							<TwitterPreview meta={new Meta(tags)} />
						</Box>
					</Flex>
					{(fetching || error) && (
						<Flex
							position="absolute"
							top={0}
							bottom={0}
							left={0}
							right={0}
							align="center"
							justify="center"
							bg="whiteAlpha.800"
						>
							{fetching && <Spinner />}
							{error && (
								<Box textAlign="center">
									<Text as="h1" fontWeight="semibold" fontSize={24}>
										Can't inspect page.
									</Text>
									<Text mt={1}>{error}</Text>
								</Box>
							)}
						</Flex>
					)}
				</Box>
			</Flex>
		</ChakraProvider>
	);
};

export default App;
