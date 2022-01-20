import { Box, ChakraProvider, Wrap } from '@chakra-ui/react';
import Discord from './components/preview/Discord';

const App: React.FC = () => {
	return (
		<ChakraProvider>
			<Wrap p={8} minH="100vh" bg="gray.50" spacing={8} justify="center">
				<Box flex={1} minW="md" maxW="xl">
					<Discord
						meta={{
							tags: {
								title: 'title',
								description: 'description',
								'og:image': 'https://via.placeholder.com/800x450',
							},
						}}
					/>
				</Box>
				<Box flex={1} minW="md" maxW="xl">
					<Discord
						meta={{
							tags: {
								title: 'title',
								description: 'description',
								'og:image': 'https://via.placeholder.com/800x450',
							},
						}}
					/>
				</Box>
			</Wrap>
		</ChakraProvider>
	);
};

export default App;
