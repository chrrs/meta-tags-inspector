import tw, { styled } from 'twin.macro';
import { keyframes } from '@emotion/react';

const spin = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
});

const Spinner = styled.i({
	...tw`border-2 border-gray-600 border-b-gray-200 border-r-gray-200 rounded-full w-8 h-8`,
	animation: `${spin} 0.75s infinite linear`,
});

export default Spinner;
