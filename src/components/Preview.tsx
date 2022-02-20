import { MetaSubset } from '$lib/meta';
import { InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Code, Flex, HStack, ListItem, Text, Tooltip, UnorderedList } from '@chakra-ui/react';

const Preview: React.FC<{
	subset: MetaSubset<any>;
	title: string;
	issues?: string[];
}> = ({ subset, title, children, issues }) => {
	return (
		<Box>
			<Flex justify="space-between" align="center" px={4} py={2} bg="gray.100">
				<Text fontWeight="bold">{title}</Text>
				<HStack gap={4}>
					{issues && issues.length > 0 && (
						<Tooltip
							bg="white"
							color="black"
							label={
								<Box p={2}>
									<Text fontWeight="bold">Potential issues</Text>
									<UnorderedList fontWeight="normal" color="yellow.500">
										{issues.map((issue: string) => (
											<ListItem key={issue}>{issue}</ListItem>
										))}
									</UnorderedList>
								</Box>
							}
						>
							<Text color="yellow.500">
								<WarningTwoIcon mb={1} mr={0.5} /> {issues.length} potential issue
								{issues.length != 1 ? 's' : ''} found
							</Text>
						</Tooltip>
					)}
					<Tooltip
						bg="white"
						color="black"
						label={
							<Flex direction="column" align="flex-start" gap={1} p={2}>
								<Text fontWeight="bold">Supported meta tags</Text>
								{subset.subset.map((tag: string) => (
									<Code
										key={tag}
										colorScheme={
											subset.get(tag) === undefined ? undefined : 'green'
										}
									>
										{tag}
									</Code>
								))}
							</Flex>
						}
					>
						<InfoOutlineIcon />
					</Tooltip>
				</HStack>
			</Flex>
			{children}
		</Box>
	);
};

export default Preview;
