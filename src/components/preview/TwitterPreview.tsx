import { Meta } from '$lib/meta';
import { ReactNode, useEffect, useState } from 'react';
import tw from 'twin.macro';
import Preview from './Preview';
import SummaryCard from './twitter/SummaryCard';
import SummaryLargeImageCard from './twitter/SummaryLargeImageCard';

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

const Wrapper = tw.div`border-t-0 border border-gray-100 p-4`;
const Author = tw.div`flex gap-3 items-center`;
const Avatar = tw.div`w-10 h-10 rounded-full bg-gray-200 flex-none`;
const Name = tw.p`font-bold leading-tight`;
const At = tw.p`text-[#536471] leading-tight`;
const Contents = tw.div`max-w-xl text-xl mt-2`;
const Link = tw.a`text-[#1d9bf0] hover:underline cursor-pointer`;

const TwitterPreview: React.VFC<{ meta: Meta }> = ({ meta }) => {
	const subset = meta.subset(TWITTER_SUBSET);

	const [cardType, setCardType] = useState<string | undefined>(undefined);

	// TODO: Display issues
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
		<Preview subset={subset} title="Twitter">
			<Wrapper>
				<Author>
					<Avatar />
					<div>
						<Name>Some Person</Name>
						<At>@person32</At>
					</div>
				</Author>
				<Contents>
					<Link>{subset.get('<url>') ?? '???'}</Link>
					{card}
				</Contents>
			</Wrapper>
		</Preview>
	);
};

export default TwitterPreview;
