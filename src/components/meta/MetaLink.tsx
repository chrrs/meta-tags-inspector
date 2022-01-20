import { Link, LinkProps } from '@chakra-ui/react';
import { getTag, Meta } from '../../lib/meta';

const MetaLink: React.FC<{ meta: Meta; tag: string | string[] } & LinkProps> = (props) => {
	const { meta, tag, children, ...rest } = props;
	const realTag = getTag(meta, tag);

	return (
		<Link {...rest} hidden={realTag === undefined}>
			{realTag}
		</Link>
	);
};

export default MetaLink;
