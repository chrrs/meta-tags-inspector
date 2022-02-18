import { MetaSubset } from '$lib/meta';
import { Box, Code, Flex, Text, Tooltip } from '@chakra-ui/react';

const Preview: React.FC<{
	subset: MetaSubset<any>;
	title: string;
}> = ({ subset, title, children }) => {
	return (
		<Box>
			<Flex justify="space-between" px={4} py={2} bg="gray.100">
				<Text fontWeight="bold">{title}</Text>
			</Flex>
			{children}
		</Box>
	);
};

export default Preview;
