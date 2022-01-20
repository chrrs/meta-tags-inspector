import { Box, ChakraProvider } from '@chakra-ui/react';
import Discord from './components/demo/Discord';

const App: React.FC = () => {
	return (
		<ChakraProvider>
			<Box p={8} minH="100vh" bg="gray.50">
				<Discord
					meta={{
						tags: {
							title: 'This is the title of the page',
							description:
								'The text here, which is the description of the page, should describe what the page is about when you click it.',
							'og:image': 'https://via.placeholder.com/800x450',
							'og:site_name': 'Site',
							'theme-color': '#ff0000',
						},
					}}
				/>
			</Box>
		</ChakraProvider>
	);
};

export default App;
