import { Meta } from '$lib/meta';
import { Avatar, Box, Flex, Link, Text, Image } from '@chakra-ui/react';
import OptionalText from '$components/OptionalText';
import OptionalLink from '$components/OptionalLink';
import Preview from '$components/Preview';
import { useEffect, useState } from 'react';

const DISCORD_SUBSET = [
	'<url>',
	['og:title', '<title>'],
	['og:description', 'description'],
	'theme-color',
	'twitter:card',
	'og:site_name',
	'og:image',
	'og:image:alt',
] as const;

const Embed: React.VFC<{
	type: 'large_image' | 'large_summary' | 'small_summary';
	siteName?: string;
	title?: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	themeColor?: string;
}> = ({ type, siteName, title, description, imageUrl, imageAlt, themeColor }) => {
	if (type === 'large_image') {
		return <Image mt={1} borderRadius={4} maxWidth="md" src={imageUrl} alt={imageAlt} />;
	} else {
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
				borderColor={themeColor ?? '#202225'}
			>
				<Box>
					<OptionalText
						color="#dcddde"
						fontSize="xs"
						mb={title !== undefined ? 1 : 0}
						content={siteName}
					/>
					<OptionalLink
						color="#01aff4"
						fontWeight="600"
						_hover={{ textDecor: 'underline' }}
						content={title}
					/>
					<OptionalText
						mt={title !== undefined ? 2 : 0}
						color="#dcddde"
						fontSize="sm"
						content={description}
					/>
					{type === 'large_summary' && (
						<Image mt={3} borderRadius={4} src={imageUrl} alt={imageAlt} />
					)}
				</Box>
				{type === 'small_summary' && (
					<Image
						height="fit-content"
						borderRadius={4}
						maxWidth={24}
						src={imageUrl}
						alt={imageAlt}
					/>
				)}
			</Flex>
		);
	}
};

const DiscordPreview: React.VFC<{ meta: Meta }> = ({ meta }) => {
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

	const showTitle = subset.get('description', 'og:title') !== undefined;
	const embedType =
		subset.get('twitter:card') === 'summary_large_image'
			? subset.get('og:image') !== undefined && !showTitle
				? 'large_image'
				: 'large_summary'
			: 'small_summary';

	const showEmbed =
		showTitle || embedType === 'large_image' || subset.get('og:site_name', 'og:description');

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

					{showEmbed && (
						<Embed
							type={embedType}
							siteName={subset.get('og:site_name')}
							title={showTitle ? subset.get('og:title', '<title>') : undefined}
							description={subset.get('og:description', 'description')}
							imageUrl={subset.getImage(subset.get('<url>'), 'og:image')}
							imageAlt={subset.get('og:image:alt')}
							themeColor={subset.get('theme-color')}
						/>
					)}
				</Box>
			</Flex>
		</Preview>
	);
};

export default DiscordPreview;
