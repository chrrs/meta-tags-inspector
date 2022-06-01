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

	return (
		<Preview subset={subset} title="Discord">
			<Wrapper>
				<Avatar />
				<div>
					<Name>
						Some Person <Timestamp>today at 12:00</Timestamp>
					</Name>
					<Link>{subset.get('<url>')}</Link>
					<Embed
						type="large_summary"
						siteName="Stack Overflow"
						title="Perform .join on value in array of objects"
						description='If I have an array of strings, I can use the .join() method to get a single string, with each element separated by commas, like so:

                        ["Joe", "Kevin", "Peter"].join(", ") // => "Joe, Kevin, Peter...'
						imageUrl="https://repository-images.githubusercontent.com/455139649/d45ef0fe-14dd-46b2-af81-a17ad4992548"
					/>
				</div>
			</Wrapper>
		</Preview>
	);
};

export default DiscordPreview;
