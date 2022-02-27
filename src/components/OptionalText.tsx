import { TextProps, Text } from '@chakra-ui/react';

const OptionalText: React.VFC<TextProps & { content?: string }> = ({ content, ...props }) => {
	if (content !== undefined) {
		return <Text {...props}>{content}</Text>;
	} else {
		return <></>;
	}
};

export default OptionalText;
