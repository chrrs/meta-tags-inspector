import { Image, ImageProps } from '@chakra-ui/react';
import { getTag, Meta } from '$lib/meta';

const MetaImage: React.FC<
	{
		meta: Meta;
		src?: string | string[];
		alt?: string | string[];
	} & ImageProps
> = (props) => {
	const { meta, src, alt, ...rest } = props;
	const realSrc = src ? getTag(meta, src) : undefined;

	return (
		<Image
			{...rest}
			hidden={realSrc === undefined}
			src={realSrc}
			alt={alt ? getTag(meta, alt) : undefined}
		/>
	);
};

export default MetaImage;
