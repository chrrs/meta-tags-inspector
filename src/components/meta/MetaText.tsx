import { Text, TextProps } from '@chakra-ui/react';
import { getTag, Meta } from '$lib/meta';

const MetaText: React.FC<{ meta: Meta; tag: string | string[] } & TextProps> = (props) => {
	const { meta, tag, children, ...rest } = props;
	const realTag = getTag(meta, tag);

	return (
		<Text {...rest} hidden={realTag === undefined}>
			{realTag}
		</Text>
	);
};

export default MetaText;
