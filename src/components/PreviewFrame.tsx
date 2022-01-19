import { Box, Text } from '@chakra-ui/react';

const PreviewFrame: React.FC<{ title: string }> = (props) => {
	return (
		<Box borderWidth="1px" borderColor="gray.100" bg="white" maxW="xl" boxShadow="lg">
			<Box px={4} py={2}>
				<Text fontWeight="600">{props.title}</Text>
			</Box>
			<Box>{props.children}</Box>
		</Box>
	);
};

export default PreviewFrame;
