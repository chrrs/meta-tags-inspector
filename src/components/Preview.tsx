import { MetaSubset } from '$lib/meta';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Code, Flex, Text, Tooltip } from '@chakra-ui/react';

const Preview: React.FC<{
	subset: MetaSubset<any>;
	title: string;
}> = ({ subset, title, children }) => {
	return (
		<Box>
			<Flex justify="space-between" align="center" px={4} py={2} bg="gray.100">
				<Text fontWeight="bold">{title}</Text>
				<Tooltip
					bg="white"
					color="black"
					label={
						<Flex direction="column" align="flex-start" gap={1} p={2}>
							<Text fontWeight="bold">Supported meta tags</Text>
							{subset.subset.map((tag: string) => (
								<Code
									key={tag}
									colorScheme={subset.get(tag) === undefined ? 'red' : 'green'}
								>
									{tag}
								</Code>
							))}
						</Flex>
					}
				>
					<InfoOutlineIcon />
				</Tooltip>
			</Flex>
			{children}
		</Box>
	);
};

export default Preview;
