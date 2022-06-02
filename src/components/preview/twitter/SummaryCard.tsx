import OptionalText from '$components/OptionalText';
import tw from 'twin.macro';

const Card = tw.div`flex mt-2 border border-[#e3e9ec] rounded-2xl overflow-hidden cursor-pointer hover:bg-[#f7f7f7] transition-colors`;
const ImageBox = tw.div`relative w-32 h-32 flex-none`;
const Image = tw.img`object-cover w-full h-full bg-black`;
const PlayButton = tw.div`absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center`;
const Details = tw.div`flex flex-col justify-center px-4 text-base leading-tight gap-0.5`;
const Site = tw.p`text-[#536471]`;
const Description = tw(OptionalText)`text-[#536471] line-clamp-2`;

const SummaryCard: React.VFC<{
	baseUrl: string;
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	player?: true;
}> = (props) => {
	return (
		<Card>
			<ImageBox>
				<Image src={props.imageUrl} alt={props.imageAlt} />
				{props.player && (
					<PlayButton>
						<svg viewBox="0 0 44 44" width="36px" height="36px" fill="none">
							<circle cx="22" cy="22" r="22" fill="white" />
							<circle cx="22" cy="22" r="18" fill="#1D9BF0" />
							<path d="M33 22L16 32V12L33 22Z" fill="white" />
						</svg>
					</PlayButton>
				)}
			</ImageBox>
			<Details>
				<Site>{props.baseUrl}</Site>
				<p>{props.title}</p>
				<Description content={props.description} />
			</Details>
		</Card>
	);
};

export default SummaryCard;
