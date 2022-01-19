import { Text, TextProps } from '@chakra-ui/react';
import { Meta } from '../../lib/meta';

const MetaText: React.FC<{ meta: Meta; tag: string } & TextProps> = (props) => {
	const { meta, tag, children, ...rest } = props;
	return <Text {...rest}>{meta.tags[tag]}</Text>;
};

export default MetaText;
