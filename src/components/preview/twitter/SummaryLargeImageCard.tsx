import OptionalText from '$components/OptionalText';
import tw from 'twin.macro';

const Card = tw.div`mt-2 border border-[#e3e9ec] rounded-2xl overflow-hidden cursor-pointer hover:bg-[#f7f7f7] transition-colors`;
const ImageBox = tw.div`relative w-full pb-[52.356%] flex-none`;
const Image = tw.img`absolute top-0 object-cover w-full h-full bg-black`;
const Details = tw.div`px-4 py-2 text-base leading-tight`;
const Site = tw.p`mb-0.5 text-[#536471]`;
const Description = tw(OptionalText)`mt-0.5 text-[#536471] line-clamp-3`;

const SummaryLargeImageCard: React.VFC<{
	baseUrl: string;
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
}> = (props) => {
	return (
		<Card>
			<ImageBox>
				<Image src={props.imageUrl} alt={props.imageAlt} />
			</ImageBox>
			<Details>
				<Site>{props.baseUrl}</Site>
				<p>{props.title}</p>
				<Description content={props.description} />
			</Details>
		</Card>
	);
};

export default SummaryLargeImageCard;
