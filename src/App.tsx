import { Box, ChakraProvider } from '@chakra-ui/react';
import Discord from './components/demo/Discord';

const App: React.FC = () => {
	return (
		<ChakraProvider>
			<Box p={8} minH="100vh" bg="gray.50">
				<Discord />
			</Box>
		</ChakraProvider>
	);
};

export default App;
