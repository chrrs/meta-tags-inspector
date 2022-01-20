import { Link, LinkProps } from '@chakra-ui/react';
import { getTag, Meta } from '../../lib/meta';

const MetaLink: React.FC<{ meta: Meta; tag: string | string[] } & LinkProps> = (props) => {
	const { meta, tag, children, ...rest } = props;
	return <Link {...rest}>{getTag(meta, tag)}</Link>;
};

export default MetaLink;
