import React from 'react';
import ReactDOM from 'react-dom';
import tw, { GlobalStyles } from 'twin.macro';
import Header from '$components/Header';
import DiscordPreview from '$components/preview/DiscordPreview';
import { Meta } from '$lib/meta';

const Wrapper = tw.div`flex flex-col w-full h-full text-sm`;
const Body = tw.div`flex-grow flex w-full p-4 gap-4 overflow-y-auto`;
const Column = tw.div`flex-1`;

const Panel: React.VFC = () => {
	return (
		<React.StrictMode>
			<GlobalStyles />
			<Wrapper>
				<Header fetching={true} onRefetch={() => {}} />
				<Body>
					<Column>
						<DiscordPreview
							meta={
								new Meta({
									'<url>': 'thing.com',
									'<title>': 'Hello World!',
									'twitter:card': 'summary_large_image',
									'og:image':
										'https://discordapp.com/assets/ba74954dde74ff40a32ff58069e78c36.png',
								})
							}
						/>
					</Column>
					<Column></Column>
				</Body>
			</Wrapper>
		</React.StrictMode>
	);
};

ReactDOM.render(<Panel />, document.getElementById('app'));
