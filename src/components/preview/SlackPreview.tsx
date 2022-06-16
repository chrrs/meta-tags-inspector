import { Meta } from '$lib/meta';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import Preview from './Preview';
import Embed from './slack/Embed';

const Wrapper = tw.div`flex gap-2 border-t-0 border border-gray-100 p-4`;
const Avatar = tw.div`flex-none w-10 h-10 rounded bg-red-500`;
const Name = tw.p`font-bold`;
const Timestamp = tw.span`font-normal text-gray-700 text-xs`;
const Link = tw.a`text-[#1264a3] hover:(underline text-[#0b4c8c]) cursor-pointer`;

const SLACK_SUBSET = [
	'<url>',
	'<favicon>',
	['twitter:card', 'og:type'],
	['twitter:title', 'og:title', '<title>'],
	['twitter:description', 'og:description', 'description'],
	['twitter:image', 'og:image'],
	['twitter:image:alt', 'og:image:alt'],
	'og:site_name',
	'twitter:player',
] as const;

const SlackPreview: React.VFC<{ meta: Meta }> = ({ meta }) => {
	const subset = meta.subset(SLACK_SUBSET);

	const [largeImage, setLargeImage] = useState(false);
	const [issues, setIssues] = useState<string[]>([]);

	useEffect(() => {
		const issues = [];
		let largeImage = subset.get('twitter:card', 'og:type') === 'summary_large_image';
		const description = subset.get('twitter:description', 'og:description', 'description');

		if (largeImage && description && description.length > 280) {
			issues.push(
				'A description larger than 280 characters will override the card type and force the image to be small.'
			);
			largeImage = false;
		}

		setIssues(issues);
		setLargeImage(largeImage);
	}, [meta]);

	const showEmbed =
		subset.get('twitter:title', 'og:title', '<title>') &&
		(subset.get('twitter:description', 'og:description', 'description') ||
			subset.get('twitter:image', 'og:image'));

	let siteName = subset.get('og:site_name');
	if (!siteName) {
		try {
			siteName = new URL(subset.get('<url>') ?? '').hostname;
		} catch (_) {
			siteName = subset.get('<url>');
		}
	}

	return (
		<Preview issues={issues} subset={subset} title="Slack">
			<Wrapper>
				<Avatar />
				<div>
					<Name>
						Some Person <Timestamp>8:22 PM</Timestamp>
					</Name>
					<Link>{subset.get('<url>') ?? '???'}</Link>
					{showEmbed && (
						<Embed
							largeImage={largeImage}
							faviconUrl={subset.getImage(subset.get('<url>'), '<favicon>')}
							siteName={siteName ?? ''}
							title={subset.get('twitter:title', 'og:title', '<title>') ?? ''}
							description={subset.get(
								'twitter:description',
								'og:description',
								'description'
							)}
							imageUrl={subset.getImage(
								subset.get('<url>'),
								'twitter:image',
								'og:image'
							)}
						/>
					)}
				</div>
			</Wrapper>
		</Preview>
	);
};

export default SlackPreview;
