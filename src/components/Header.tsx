import React from 'react';
import tw, { styled } from 'twin.macro';

const Wrapper = tw.div`px-4 py-2 gap-2 bg-gray-100 bg-opacity-50 backdrop-blur flex items-center justify-between`;
const Button = styled.button({
	...tw`transition-colors bg-blue-500 text-white rounded px-2 py-0.5 whitespace-nowrap`,
	...tw`hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300`,
});

const Header: React.VFC<{ fetching: boolean; onRefetch: () => void }> = (props) => {
	return (
		<Wrapper>
			<p>
				<b>Note: </b>
				Previews are not always 100% accurate. Make sure to check manually if necessary.
			</p>

			<Button disabled={props.fetching} onClick={() => props.onRefetch()}>
				Refetch tags
			</Button>
		</Wrapper>
	);
};

export default Header;
