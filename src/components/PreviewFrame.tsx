import { Box, Text } from '@chakra-ui/react';

const PreviewFrame: React.FC<{ title: string; icon?: React.ReactNode }> = (props) => {
	return (
		<Box borderWidth="1px" borderColor="gray.100" bg="white" boxShadow="lg">
			<Box px={4} py={2}>
				<Text objectPosition="middle" fontWeight="600">
					{props.icon}
					{props.title}
				</Text>
			</Box>
			<Box>{props.children}</Box>
		</Box>
	);
};

export default PreviewFrame;
