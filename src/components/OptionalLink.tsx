import React, { forwardRef } from 'react';

const OptionalLink: React.VFC<React.ComponentPropsWithRef<'a'> & { content?: string }> = forwardRef(
	({ content, ...props }) => {
		if (content !== undefined) {
			return <a {...props}>{content}</a>;
		} else {
			return <></>;
		}
	}
);

export default OptionalLink;
