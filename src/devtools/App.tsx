import { Box, ChakraProvider, Wrap } from '@chakra-ui/react';
import Discord from '$components/preview/Discord';
import RawTags from '$components/preview/RawTags';

const App: React.FC = () => {
	const meta = {
		tags: {
			title: 'Some website',
			description:
				'This is a pretty long description in order to test how the UI will look when lines overflow onto the next line.',
			'og:image': 'https://via.placeholder.com/800x450',
			'og:site_name': 'Site',
			'twitter:card': 'summary_large_image',
		},
	};

	return (
		<ChakraProvider>
			<Wrap p={8} minH="100vh" bg="gray.50" spacing={8} justify="center">
				<Box flex={1} minW="md" maxW="xl">
					<RawTags meta={meta} />
				</Box>
				<Box flex={1} minW="md" maxW="xl">
					<Discord meta={meta} />
				</Box>
			</Wrap>
		</ChakraProvider>
	);
};

export default App;
