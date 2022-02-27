import { Link, LinkProps } from '@chakra-ui/react';

const OptionalLink: React.VFC<LinkProps & { content?: string }> = ({ content, ...props }) => {
	if (content !== undefined) {
		return <Link {...props}>{content}</Link>;
	} else {
		return <></>;
	}
};

export default OptionalLink;
