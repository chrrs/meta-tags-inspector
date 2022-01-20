import { Avatar, Box, Flex, Text, Link, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTag, Meta } from '../../lib/meta';
import MetaImage from '../meta/MetaImage';
import MetaLink from '../meta/MetaLink';
import MetaText from '../meta/MetaText';
import PreviewFrame from '../PreviewFrame';

const Discord: React.FC<{ meta: Meta }> = (props) => {
	const [largeImage, setLargeImage] = useState(false);

	useEffect(() => {
		setLargeImage(getTag(props.meta, 'twitter:card') === 'summary_large_image');
	}, [props.meta]);

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
					<Flex
						mt={1}
						px={3}
						py={4}
						gap={4}
						bg="#2f3136"
						borderRadius={4}
						borderLeftWidth={4}
						borderColor={getTag(props.meta, 'theme-color') ?? '#202225'}
					>
						<Box>
							<MetaText
								meta={props.meta}
								tag="og:site_name"
								color="#dcddde"
								fontSize="xs"
								mb={1}
							/>
							<MetaLink
								meta={props.meta}
								tag={['og:title', 'title']}
								color="#01aff4"
								fontWeight="600"
								_hover={{ textDecor: 'underline' }}
							/>
							<MetaText
								meta={props.meta}
								tag={['og:description', 'description']}
								mt={2}
								color="#dcddde"
								fontSize="sm"
							/>
							{largeImage && (
								<MetaImage
									meta={props.meta}
									mt={3}
									borderRadius={4}
									src="og:image"
									alt="og:image:alt"
								/>
							)}
						</Box>
						{!largeImage && (
							<MetaImage
								meta={props.meta}
								borderRadius={4}
								maxWidth={24}
								src="og:image"
								alt="og:image:alt"
							/>
						)}
					</Flex>
				</Box>
			</Flex>
		</PreviewFrame>
	);
};

export default Discord;
