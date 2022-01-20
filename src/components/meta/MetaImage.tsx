import { Image, ImageProps } from '@chakra-ui/react';
import { getTag, Meta } from '../../lib/meta';

const MetaImage: React.FC<
	{
		meta: Meta;
		src?: string | string[];
		alt?: string | string[];
	} & ImageProps
> = (props) => {
	const { meta, src, alt, ...rest } = props;
	return (
		<Image
			{...rest}
			src={src ? getTag(meta, src) : undefined}
			alt={alt ? getTag(meta, alt) : undefined}
		/>
	);
};

export default MetaImage;
