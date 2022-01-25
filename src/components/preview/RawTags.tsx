import { Box, VStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Meta } from '$lib/meta';
import PreviewFrame from '$components/PreviewFrame';

const RawTags: React.FC<{ meta: Meta }> = (props) => {
	// TODO: Add more specific information to each property. (enum values, image links, etc.)

	const categories = [
		['OpenGraph', 'og:'],
		['Twitter', 'twitter:'],
	];

	const [tags, setTags] = useState<Record<string, [string, string][]>>({});

	useEffect(() => {
		const tags: Record<string, [string, string][]> = {};

		for (const [tag, value] of Object.entries(props.meta.tags)) {
			const category = categories.find((e) => tag.startsWith(e[1]))?.[0] ?? 'General';
			const list = tags[category] ?? [];
			list.push([tag, value]);
			tags[category] = list;
		}

		setTags(tags);
	}, [props.meta]);

	return (
		<PreviewFrame title="Raw tags">
			<VStack px={4} py={3} bg="gray.50" spacing={4} align="start">
				{['General', ...categories.map((it) => it[0])].map(
					(category) =>
						tags[category] && (
							<Box key={category} w="full">
								<Text fontSize="sm" fontWeight="600" color="gray.500" mb={1}>
									{category}
								</Text>
								<VStack lineHeight="5" spacing={1} align="start">
									{tags[category]?.map((item) => (
										<Text key={item[0]}>
											<Text as="code">{item[0]}</Text>: {item[1]}
										</Text>
									))}
								</VStack>
							</Box>
						)
				)}
			</VStack>
		</PreviewFrame>
	);
};

export default RawTags;
