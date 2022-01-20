import { Box, ChakraProvider } from '@chakra-ui/react';
import Discord from './components/demo/Discord';

const App: React.FC = () => {
	return (
		<ChakraProvider>
			<Box p={8} minH="100vh" bg="gray.50">
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
		</ChakraProvider>
	);
};

export default App;
