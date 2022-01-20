import { Text, TextProps } from '@chakra-ui/react';
import { getTag, Meta } from '../../lib/meta';

const MetaText: React.FC<{ meta: Meta; tag: string | string[] } & TextProps> = (props) => {
	const { meta, tag, children, ...rest } = props;
	return <Text {...rest}>{getTag(meta, tag)}</Text>;
};

export default MetaText;
