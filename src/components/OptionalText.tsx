import React, { forwardRef } from 'react';

function OptionalText<T extends React.ElementType = 'p'>({
	as,
	content,
	...props
}: {
	as?: T;
	content?: string;
}) {
	const Component = as ?? 'p';

	if (content !== undefined) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return <Component {...props}>{content}</Component>;
	} else {
		return <></>;
	}
}

export default forwardRef(OptionalText);
