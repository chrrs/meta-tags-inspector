import OptionalText from '$components/OptionalText';
import React from 'react';
import tw from 'twin.macro';

const Wrapper = tw.div`mt-2 flex items-stretch gap-2 max-w-xl`;
const Border = tw.div`flex-none w-1 rounded-full bg-gray-200`;
const SiteName = tw.p`font-bold`;
const Favicon = tw.img`inline-block w-4 h-4 rounded-sm align-middle mb-0.5 mr-2`;
const Title = tw.a`font-bold text-[#1264a3] hover:(underline text-[#0b4c8c]) cursor-pointer`;
const Description = tw(OptionalText)`text-gray-700`;
const LargeImage = tw.img`w-[360px] h-auto border border-gray-200 rounded-lg mt-1`;
const SmallImageContainer = tw.div`flex-none w-[180px]`;
const SmallImage = tw.img`flex-none w-[180px] h-auto border border-gray-200 rounded-lg`;

const Embed: React.VFC<{
	largeImage?: boolean;
	faviconUrl?: string;
	siteName: string;
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
}> = (props) => {
	return (
		<Wrapper>
			<Border />
			<div>
				<SiteName>
					{props.faviconUrl && <Favicon src={props.faviconUrl} />}
					{props.siteName}
				</SiteName>
				<Title>{props.title}</Title>
				<Description content={props.description} />
				{props.largeImage && props.imageUrl && (
					<LargeImage src={props.imageUrl} alt={props.imageAlt} />
				)}
			</div>
			{!props.largeImage && props.imageUrl && (
				<SmallImageContainer>
					<SmallImage src={props.imageUrl} alt={props.imageAlt} />
				</SmallImageContainer>
			)}
		</Wrapper>
	);
};

export default Embed;
