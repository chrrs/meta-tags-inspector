import { Image, ImageProps } from '@chakra-ui/react';
import { Meta } from '../../lib/meta';

const MetaImage: React.FC<{ meta: Meta } & ImageProps> = (props) => {
	const { meta, src, alt, ...rest } = props;
	return (
		<Image
			{...rest}
			src={src ? meta.tags[src] : undefined}
			alt={alt ? meta.tags[alt] : undefined}
		/>
	);
};

export default MetaImage;
