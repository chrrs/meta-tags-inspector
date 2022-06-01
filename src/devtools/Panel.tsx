import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import tw, { GlobalStyles } from 'twin.macro';
import Header from '$components/Header';
import DiscordPreview from '$components/preview/DiscordPreview';
import { Meta } from '$lib/meta';
import { Connection } from '$lib/tags';
import Spinner from '$components/Spinner';

const Wrapper = tw.div`flex flex-col w-full h-full text-sm`;
const Body = tw.div`flex-grow flex w-full p-4 gap-4 overflow-y-auto`;
const Column = tw.div`flex-1`;
const StatusOverlay = tw.div`flex-grow flex flex-col items-center justify-center`;

const Panel: React.VFC = () => {
	const [connection] = useState(new Connection());
	const [fetching, setFetching] = useState(true);
	const [tags, setTags] = useState({});

	useEffect(() => {
		if (chrome?.runtime) {
			connection.onFetching = () => setFetching(true);

			connection.onError = (error) => {
				setFetching(false);
				console.log('TODO: Implement errors', error);
			};

			connection.onFetched = (tags) => {
				setFetching(false);
				setTags(tags);
			};

			connection.connect(chrome.devtools.inspectedWindow.tabId);
			return () => connection.disconnect();
		}
	}, [connection]);

	return (
		<React.StrictMode>
			<GlobalStyles />
			<Wrapper>
				<Header fetching={fetching} onRefetch={() => connection.refetch()} />
				{!fetching && (
					<Body>
						<Column>
							<DiscordPreview meta={new Meta(tags)} />
						</Column>
						<Column></Column>
					</Body>
				)}
				{fetching && (
					<StatusOverlay>
						<Spinner />
					</StatusOverlay>
				)}
			</Wrapper>
		</React.StrictMode>
	);
};

ReactDOM.render(<Panel />, document.getElementById('app'));
