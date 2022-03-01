import OptionalText from '$components/OptionalText';
import Preview from '$components/Preview';
import { Meta } from '$lib/meta';
import { Avatar, Box, Flex, Link, Text, Image, AspectRatio, Icon, Center } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';

const TWITTER_SUBSET = [
	'<url>',
	['twitter:card', 'og:type'],
	['twitter:title', 'og:title'],
	['twitter:description', 'og:description'],
	['twitter:image', 'og:image'],
	['twitter:image:alt', 'og:image:alt'],
	'twitter:site',
	'twitter:player',
	'twitter:player:width',
	'twitter:player:height',
] as const;

const SummaryLargeImageCard: React.VFC<{
	baseUrl: string;
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
}> = ({ baseUrl, title, description, imageUrl, imageAlt }) => {
	return (
		<Box
			mt={2}
			borderWidth={1}
			borderColor="#e3e9ec"
			borderRadius="xl"
			overflow="hidden"
			cursor="pointer"
			_hover={{ bg: '#f7f7f7' }}
			transition="background 0.2s"
		>
			<AspectRatio width="full" ratio={2 / 1}>
				<Image src={imageUrl} alt={imageAlt} />
			</AspectRatio>
			<Box px={4} py={2}>
				<Text color="#536471">{baseUrl}</Text>
				<Text>{title}</Text>
				<OptionalText noOfLines={3} color="#536471" content={description} />
			</Box>
		</Box>
	);
};

const SummaryCard: React.VFC<{
	baseUrl: string;
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	player?: true;
}> = ({ baseUrl, title, description, imageUrl, imageAlt, player }) => {
	return (
		<Flex
			mt={2}
			borderWidth={1}
			borderColor="#e3e9ec"
			borderRadius="xl"
			overflow="hidden"
			cursor="pointer"
			_hover={{ bg: '#f7f7f7' }}
			transition="background 0.2s"
		>
			<AspectRatio flexShrink={0} width="123px" ratio={1}>
				<Box position="relative">
					<Image
						objectFit="cover"
						width="full"
						height="full"
						bg="black"
						src={imageUrl}
						alt={imageAlt}
					/>
					{player && (
						<Center position="absolute" top={0} bottom={0} left={0} right={0}>
							<Icon viewBox="0 0 44 44" width="36px" height="36px" fill="none">
								<circle cx="22" cy="22" r="22" fill="white" />
								<circle cx="22" cy="22" r="18" fill="#1D9BF0" />
								<path d="M33 22L16 32V12L33 22Z" fill="white" />
							</Icon>
						</Center>
					)}
				</Box>
			</AspectRatio>
			<Flex direction="column" justify="center" px={4}>
				<Text color="#536471">{baseUrl}</Text>
				<Text>{title}</Text>
				<OptionalText noOfLines={2} color="#536471" content={description} />
			</Flex>
		</Flex>
	);
};

export const TwitterPreview: React.VFC<{ meta: Meta }> = ({ meta }) => {
	const subset = meta.subset(TWITTER_SUBSET);

	const [cardType, setCardType] = useState<string | undefined>(undefined);
	const [issues, setIssues] = useState<string[]>([]);

	useEffect(() => {
		// TODO: Raise an issue when images are the wrong size.

		const issues = [] as string[];

		let cardType = subset.get('twitter:card');
		if (
			cardType === undefined &&
			subset.get('og:type') &&
			subset.get('og:title') &&
			subset.get('og:description')
		) {
			cardType = 'summary';
		}

		if (cardType !== undefined) {
			if (!['summary', 'summary_large_image', 'app', 'player'].includes(cardType)) {
				issues.push(
					'Card type should be one of summary, summary_large_image, app or player.'
				);

				setCardType(undefined);
			} else if (subset.get('twitter:title', 'og:title') === undefined) {
				issues.push('The twitter:title or og:title tag is required for any card to render');

				setCardType(undefined);
			} else if (cardType === 'player') {
				const show =
					subset.get('twitter:image', 'og:image') !== undefined &&
					subset.get('twitter:site') !== undefined &&
					subset.get('twitter:player') !== undefined &&
					subset.get('twitter:player:width') !== undefined &&
					subset.get('twitter:player:height') !== undefined;

				if (!show) {
					issues.push(
						'A player card should have the twitter:image (or og:image), twitter:site, twitter:player, twitter:player:width and twitter:player:height tags.'
					);
				}

				setCardType(show ? 'player' : undefined);
			} else {
				setCardType(cardType);
			}

			const imageUrl = subset.get('twitter:image', 'og:image');
			if (imageUrl && !/^https?:\/\//.test(imageUrl)) {
				issues.push("Image URL's should not be relative.");
			}
		} else {
			setCardType(undefined);
		}

		setIssues(issues);
	}, [meta]);

	let card: ReactNode | undefined;
	if (cardType === 'summary') {
		const url = subset.get('<url>');
		const baseUrl = (url && new URL(url).host) ?? '???';
		const title = subset.get('twitter:title', 'og:title');

		card = (
			<SummaryCard
				baseUrl={baseUrl}
				title={title ?? '???'}
				description={subset.get('twitter:description', 'og:description')}
				imageUrl={subset.get('twitter:image', 'og:image')}
				imageAlt={subset.get('twitter:image:alt', 'og:image:alt')}
			/>
		);
	} else if (cardType === 'summary_large_image') {
		const url = subset.get('<url>');
		const baseUrl = (url && new URL(url).host) ?? '???';
		const title = subset.get('twitter:title', 'og:title');

		card = (
			<SummaryLargeImageCard
				baseUrl={baseUrl}
				title={title ?? '???'}
				description={subset.get('twitter:description', 'og:description')}
				imageUrl={subset.get('twitter:image', 'og:image')}
				imageAlt={subset.get('twitter:image:alt', 'og:image:alt')}
			/>
		);
	} else if (cardType === 'player') {
		const url = subset.get('<url>');
		const baseUrl = (url && new URL(url).host) ?? '???';
		const title = subset.get('twitter:title', 'og:title');

		card = (
			<SummaryCard
				player
				baseUrl={baseUrl}
				title={title ?? '???'}
				description={subset.get('twitter:description', 'og:description')}
				imageUrl={subset.get('twitter:image', 'og:image')}
				imageAlt={subset.get('twitter:image:alt', 'og:image:alt')}
			/>
		);
	} else if (cardType === 'app') {
		card = <>App cards are currently not supported in meta-tags-inspector.</>;
	}

	return (
		<Preview subset={subset} title="Twitter" issues={issues}>
			<Box p={4} borderTop="none" borderWidth={1} borderColor="gray.100">
				<Box maxWidth="xl">
					<Flex gap={3} align="center">
						<Avatar name="Some Person" />
						<Box>
							<Text fontWeight="bold" lineHeight="short">
								Some Person
							</Text>
							<Text color="#536471" lineHeight="short">
								@SomePerson
							</Text>
						</Box>
					</Flex>
					<Text fontSize="xl" mt={2}>
						<Link color="#1d9bf0">{subset.get('<url>')}</Link>
					</Text>
					{card}
				</Box>
			</Box>
		</Preview>
	);
};
