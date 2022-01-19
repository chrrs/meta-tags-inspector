import { Avatar, Box, Flex, Text, Link, Image } from '@chakra-ui/react';
import PreviewFrame from '../PreviewFrame';

const Discord: React.FC = () => {
	return (
		<PreviewFrame title="Discord">
			<Flex bg="#36393f" p={4} gap={3}>
				<Avatar name="Some Person" size="md" />
				<Box>
					<Text>
						<Text as="span" fontWeight="600" color="#fdfdfd" mr={3}>
							Some Person
						</Text>
						<Text as="span" fontSize="xs" color="#656b6e">
							today at 12:00
						</Text>
					</Text>
					<Link color="#01aff4" _hover={{ textDecor: 'underline' }}>
						{location.toString()}
					</Link>
					<Box
						mt={1}
						px={3}
						py={4}
						bg="#2f3136"
						borderRadius={4}
						borderLeftWidth={4}
						borderColor="#202225"
					>
						<Link color="#01aff4" fontWeight="600" _hover={{ textDecor: 'underline' }}>
							This is the title of the page
						</Link>
						<Text mt={2} color="#dcddde" fontSize="sm">
							The text here, which is the description of the page, should describe
							what the page is about when you click it.
						</Text>
						<Image mt={3} borderRadius={4} src="https://via.placeholder.com/800x450" />
					</Box>
				</Box>
			</Flex>
		</PreviewFrame>
	);
};

export default Discord;
