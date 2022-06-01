import OptionalLink from '$components/OptionalLink';
import OptionalText from '$components/OptionalText';
import tw, { styled } from 'twin.macro';

const FullSizeImage = tw.img`mt-2 rounded max-w-md`;

const Wrapper = styled.div(
	tw`flex mt-2 rounded border-l-4 p-4 gap-4 bg-[#2f3136]`,
	({ accent, expand }: { accent?: string; expand: boolean }) => ({
		borderColor: accent ?? '#202225',
		...(expand ? tw`max-w-xl` : tw`max-w-md`),
	})
);
const SiteName = tw(OptionalText)`text-xs text-[#dcddde]`;
const Content = tw.div`flex flex-col gap-1`;
const Title = tw(OptionalLink)`text-blue-400 hover:underline font-semibold cursor-pointer`;
const Description = tw(OptionalText)`text-sm text-[#dcddde]`;
const SmallImage = tw.img`flex-grow rounded max-w-[5rem] h-[fit-content]`;
const LargeImage = tw.img`mt-3 rounded`;

const Embed: React.VFC<{
	type: 'large_image' | 'large_summary' | 'small_summary';
	siteName?: string;
	title?: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	themeColor?: string;
}> = (props) => {
	if (props.type === 'large_image') {
		return <FullSizeImage src={props.imageUrl} alt={props.imageAlt} />;
	} else {
		return (
			<Wrapper expand={props.type === 'small_summary'} accent={props.themeColor}>
				<Content>
					<SiteName content={props.siteName} />
					<Title content={props.title} />
					<Description content={props.description} />
					{props.type === 'large_summary' && (
						<LargeImage src={props.imageUrl} alt={props.imageAlt} />
					)}
				</Content>
				{props.type === 'small_summary' && (
					<SmallImage src={props.imageUrl} alt={props.imageAlt} />
				)}
			</Wrapper>
		);
	}
};

export default Embed;
