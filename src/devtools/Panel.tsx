import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import tw, { GlobalStyles } from 'twin.macro';
import Header from '$components/Header';
import DiscordPreview from '$components/preview/DiscordPreview';
import { Meta } from '$lib/meta';
import { Connection } from '$lib/tags';
import Spinner from '$components/Spinner';

const Wrapper = tw.div`flex flex-col w-full h-full text-sm`;
const Body = tw.div`flex-grow flex-col xl:flex-row flex w-full p-4 gap-4 overflow-y-auto`;
const Column = tw.div`flex-1`;
const StatusOverlay = tw.div`flex-grow flex flex-col items-center justify-center`;
const ErrorHeader = tw.h1`text-2xl font-semibold`;
const ErrorSubtitle = tw.h2`mt-1`;

const Panel: React.VFC = () => {
	const [connection] = useState(new Connection());
	const [fetching, setFetching] = useState(true);
	const [error, setError] = useState<string>();
	const [tags, setTags] = useState({});

	useEffect(() => {
		if (chrome?.runtime) {
			connection.onFetching = () => {
				setFetching(true);
				setError(undefined);
			};

			connection.onError = (error) => {
				setFetching(false);
				setError(error);
			};

			connection.onFetched = (tags) => {
				setFetching(false);
				setError(undefined);
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
				{!(fetching || error) && (
					<Body>
						<Column>
							<DiscordPreview meta={new Meta(tags)} />
						</Column>
						<Column></Column>
					</Body>
				)}
				{(fetching || error) && (
					<StatusOverlay>
						{fetching && <Spinner />}
						{error && (
							<>
								<ErrorHeader>Can't inspect page</ErrorHeader>
								<ErrorSubtitle>{error}</ErrorSubtitle>
							</>
						)}
					</StatusOverlay>
				)}
			</Wrapper>
		</React.StrictMode>
	);
};

ReactDOM.render(<Panel />, document.getElementById('app'));
