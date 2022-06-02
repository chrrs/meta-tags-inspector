import React, { useEffect, useState } from 'react';
import { Meta } from '$lib/meta';
import tw from 'twin.macro';
import Embed from './discord/Embed';
import Preview from './Preview';

const DISCORD_SUBSET = [
	'<url>',
	['twitter:title', 'og:title', '<title>'],
	['twitter:description', 'og:description', 'description'],
	'theme-color',
	'twitter:card',
	'og:site_name',
	['twitter:image', 'og:image'],
	['twitter:image:alt', 'og:image:alt'],
] as const;

const Wrapper = tw.div`flex bg-[#36393f] p-4 gap-3 text-base`;
const Avatar = tw.div`w-10 h-10 rounded-full bg-white flex-none`;
const Name = tw.p`text-white font-semibold`;
const Timestamp = tw.span`ml-1 text-gray-400 font-normal text-xs`;
const Link = tw.a`text-blue-400 hover:underline cursor-pointer leading-tight`;

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

	const showTitle = subset.get('description', 'twitter:title', 'og:title') !== undefined;
	const embedType =
		subset.get('twitter:card') === 'summary_large_image'
			? subset.get('twitter:image', 'og:image') !== undefined && !showTitle
				? 'large_image'
				: 'large_summary'
			: 'small_summary';

	const showEmbed =
		showTitle ||
		embedType === 'large_image' ||
		subset.get('og:site_name', 'twitter:description', 'og:description');

	return (
		<Preview subset={subset} title="Discord" issues={issues}>
			<Wrapper>
				<Avatar />
				<div>
					<Name>
						Some Person <Timestamp>today at 12:00</Timestamp>
					</Name>
					<Link>{subset.get('<url>') ?? '???'}</Link>
					{showEmbed && (
						<Embed
							type={embedType}
							siteName={subset.get('og:site_name')}
							title={
								showTitle
									? subset.get('twitter:title', 'og:title', '<title>')
									: undefined
							}
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
							imageAlt={subset.get('twitter:image:alt', 'og:image:alt')}
							themeColor={subset.get('theme-color')}
						/>
					)}
				</div>
			</Wrapper>
		</Preview>
	);
};

export default DiscordPreview;
