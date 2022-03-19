import { RepeatIcon } from '@chakra-ui/icons';
import { Flex, Text, Button } from '@chakra-ui/react';

const Header: React.VFC<{
	fetching: boolean;
	onRefetch: () => void;
}> = ({ fetching, onRefetch }) => {
	return (
		<Flex px={4} py={2} gap={2} bg="gray.100" align="center" justify="space-between">
			<Text>
				<b>Note: </b>
				Previews are not always 100% accurate. Make sure to check manually if necessary.
			</Text>

			<Button
				flexShrink="0"
				size="xs"
				leftIcon={<RepeatIcon />}
				loadingText="Fetching..."
				colorScheme="blue"
				isLoading={fetching}
				onClick={onRefetch}
			>
				Refetch tags
			</Button>
		</Flex>
	);
};

export default Header;
