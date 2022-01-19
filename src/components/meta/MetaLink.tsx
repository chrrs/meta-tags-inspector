import { Link, LinkProps } from '@chakra-ui/react';
import { Meta } from '../../lib/meta';

const MetaLink: React.FC<{ meta: Meta; tag: string } & LinkProps> = (props) => {
	const { meta, tag, children, ...rest } = props;
	return <Link {...rest}>{meta.tags[tag]}</Link>;
};

export default MetaLink;
