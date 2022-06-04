import OptionalText from '$components/OptionalText';
import { Meta } from '$lib/meta';
import tw from 'twin.macro';
import Preview from './Preview';

const SEARCH_ENGINE_SUBSET = ['<url>', '<title>', 'description'] as const;

const Path = tw.span`text-gray-600`;

const Url: React.VFC<{ url: string }> = (props) => {
	try {
		const url = new URL(props.url);
		const path = url.pathname.substring(1).split('/').join(' \u203A ');

		return (
			<p>
				{url.origin}
				{path !== '' && <Path> &rsaquo; {path}</Path>}
			</p>
		);
	} catch (_) {
		return <p>{props.url}</p>;
	}
};

const Wrapper = tw.div`border-t-0 border border-gray-100 p-4`;
const Title = tw.p`mt-0.5 text-lg text-blue-700 hover:underline cursor-pointer`;
const Description = tw(OptionalText)`text-gray-800`;
const Notice = tw.p`mt-4 px-4 py-2 rounded bg-yellow-100 text-yellow-800`;

const SearchEnginePreview: React.VFC<{ meta: Meta }> = ({ meta }) => {
	const subset = meta.subset(SEARCH_ENGINE_SUBSET);

	return (
		<Preview subset={subset} title="Search Engine">
			<Wrapper>
				<Url url={subset.get('<url>') ?? '???'} />
				<Title>{subset.get('<title>', '<url>') ?? '???'}</Title>
				<Description content={subset.get('description')} />
				<Notice>
					<b>Note:</b> Search engines change site metadata a <em>lot</em>! This preview
					only exists to give you a general idea and will most likely not be accurate.
				</Notice>
			</Wrapper>
		</Preview>
	);
};

export default SearchEnginePreview;
