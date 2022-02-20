import { Meta, MetaSubset } from '$lib/meta';
import { Avatar, Box, Flex, Link, Text, Image } from '@chakra-ui/react';
import OptionalText from '$components/OptionalText';
import Preview from '$components/Preview';
import { useEffect, useState } from 'react';

const DISCORD_SUBSET = [
	'<url>',
	'<title>',
	'description',
	'theme-color',
	'twitter:card',
	'og:title',
	'og:description',
	'og:site_name',
	'og:image',
	'og:image:alt',
] as const;

const Embed: React.FC<{ subset: MetaSubset<typeof DISCORD_SUBSET> }> = ({ subset }) => {
	const largeImage = subset.get('twitter:card') === 'summary_large_image';
	const showTitle = subset.get('description', 'og:title') !== undefined;
	const show = showTitle || (subset.get('og:image') && !largeImage) || subset.get('og:site_name');

	let imageUrl = subset.get('og:image');
	imageUrl = imageUrl && new URL(imageUrl, subset.get('<url>')).href;

	if (!showTitle && subset.get('og:image') && largeImage) {
		return (
			<Image
				mt={1}
				borderRadius={4}
				maxWidth="md"
				src={subset.get('og:image')}
				alt={subset.get('og:image:alt')}
			/>
		);
	} else if (show) {
		return (
			<Flex
				width="fit-content"
				maxW="md"
				mt={1}
				px={4}
				py={4}
				gap={4}
				bg="#2f3136"
				borderRadius={4}
				borderLeftWidth={4}
				borderColor={subset.get('theme-color') ?? '#202225'}
			>
				<Box>
					<OptionalText
						color="#dcddde"
						fontSize="xs"
						mb={showTitle ? 1 : 0}
						content={subset.get('og:site_name')}
					/>
					{showTitle && (
						<Link color="#01aff4" fontWeight="600" _hover={{ textDecor: 'underline' }}>
							{subset.get('og:title', '<title>')}
						</Link>
					)}
					<OptionalText
						mt={showTitle ? 2 : 0}
						color="#dcddde"
						fontSize="sm"
						content={subset.get('og:description', 'description')}
					/>
					{largeImage && (
						<Image
							mt={3}
							borderRadius={4}
							src={imageUrl}
							alt={subset.get('og:image:alt')}
						/>
					)}
				</Box>
				{!largeImage && (
					<Image
						height="fit-content"
						borderRadius={4}
						maxWidth={24}
						src={imageUrl}
						alt={subset.get('og:image:alt')}
					/>
				)}
			</Flex>
		);
	} else {
		return <></>;
	}
};

const DiscordPreview: React.FC<{ meta: Meta }> = ({ meta }) => {
	const subset = meta.subset(DISCORD_SUBSET);

	const [issues, setIssues] = useState<string[]>([]);

	useEffect(() => {
		const issues = [] as string[];

		const ogTitle = subset.get('og:title');
		const ogDescription = subset.get('og:description');
		const description = subset.get('description');
		if ((ogTitle && !ogDescription && description) || (!ogTitle && ogDescription)) {
			issues.push(
				'OpenGraph tags are mixed with non-OpenGraph tags, which could lead to issues. This is probably caused by a missing og:title or og:description tag.'
			);
		}

		setIssues(issues);
	}, [meta]);

	return (
		<Preview subset={subset} title="Discord" issues={issues}>
			<Flex bg="#36393f" p={4} gap={3} fontSize="md">
				<Avatar name="Some Person" size="md" />
				<Box>
					<Text>
						<Text as="span" fontWeight="600" color="#fdfdfd" mr={3}>
							Some Person
						</Text>
						<Text as="span" fontSize="xs" color="#656b6e">
							today at 12:00
						</Text>
					</Text>
					<Link color="#01aff4" _hover={{ textDecor: 'underline' }}>
						{subset.get('<url>') ?? '???'}
					</Link>
					<Embed subset={subset} />
				</Box>
			</Flex>
		</Preview>
	);
};

export default DiscordPreview;
