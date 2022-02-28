import { MetaSubset } from '$lib/meta';
import { ChevronRightIcon, InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Code, Flex, HStack, ListItem, Text, Tooltip, UnorderedList } from '@chakra-ui/react';
import { ReactNode } from 'react';

const TagsTooltipPriority: React.VFC<{
	subset: MetaSubset<readonly (string | readonly string[])[], unknown>;
	tags: readonly string[];
}> = ({ subset, tags }) => {
	let first = true;
	const parts: ReactNode[] = [];
	for (let i = 0; i < tags.length; i++) {
		const tag = tags[i];
		const set = subset.get(tag);

		parts.push(
			<Text opacity={first ? '100%' : '50%'}>
				{i !== 0 && <ChevronRightIcon mx={1} color="gray.500" />}
				<Code key={tag} colorScheme={subset.get(tag) && 'green'}>
					{tag}
				</Code>
			</Text>
		);

		if (set) {
			first = false;
		}
	}

	return <Flex flexWrap="wrap">{parts}</Flex>;
};

const TagsTooltip: React.VFC<{
	subset: MetaSubset<readonly (string | readonly string[])[], unknown>;
}> = ({ subset }) => {
	return (
		<Flex direction="column" align="flex-start" gap={1} p={2}>
			<Text fontWeight="bold">Supported meta tags</Text>
			{subset.subset.map((tag) =>
				typeof tag === 'string' ? (
					<Code key={tag} colorScheme={subset.get(tag) && 'green'}>
						{tag}
					</Code>
				) : (
					<TagsTooltipPriority key={tag.join(' ')} subset={subset} tags={tag} />
				)
			)}
		</Flex>
	);
};

const IssuesTooltip: React.VFC<{ issues: string[] }> = ({ issues }) => {
	return (
		<Box p={2}>
			<Text fontWeight="bold">Potential issues</Text>
			<UnorderedList fontWeight="normal" color="yellow.500">
				{issues.map((issue: string) => (
					<ListItem key={issue}>{issue}</ListItem>
				))}
			</UnorderedList>
		</Box>
	);
};

const Preview: React.FC<{
	subset: MetaSubset<readonly (string | readonly string[])[], unknown>;
	title: string;
	issues?: string[];
}> = ({ subset, title, children, issues }) => {
	return (
		<Box>
			<Flex justify="space-between" align="center" px={4} py={2} bg="gray.100">
				<Text fontWeight="bold">{title}</Text>
				<HStack gap={4}>
					{issues && issues.length > 0 && (
						<Tooltip bg="white" color="black" label={<IssuesTooltip issues={issues} />}>
							<Text color="yellow.500">
								<WarningTwoIcon mb={1} mr={0.5} /> {issues.length} potential issue
								{issues.length != 1 ? 's' : ''} found
							</Text>
						</Tooltip>
					)}
					<Tooltip bg="white" color="black" label={<TagsTooltip subset={subset} />}>
						<InfoOutlineIcon />
					</Tooltip>
				</HStack>
			</Flex>
			{children}
		</Box>
	);
};

export default Preview;
