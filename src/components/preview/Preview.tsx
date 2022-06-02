import React from 'react';
import tw, { styled } from 'twin.macro';

import { RiAlarmWarningLine, RiArrowRightSLine, RiInformationLine } from 'react-icons/ri';
import { MetaSubset } from '$lib/meta';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/shift-toward-subtle.css';
import { ReactNode } from 'react';

const Tags = tw.div`flex flex-wrap items-center`;
const ChevronRightIcon = tw(RiArrowRightSLine)`inline-block mx-1 text-gray-500 text-base pb-0.5`;
const Tag = styled.span((props: { present: boolean }) => ({
	...tw`font-mono px-1`,
	...(props.present ? tw`bg-green-200` : tw`bg-gray-200`),
}));

const PriorityTags: React.VFC<{
	subset: MetaSubset<readonly (string | readonly string[])[], unknown>;
	tags: readonly string[];
}> = (props) => {
	let first = true;
	const parts: ReactNode[] = [];

	for (let i = 0; i < props.tags.length; i++) {
		const tag = props.tags[i];
		const set = props.subset.get(tag);

		parts.push(
			<p style={{ opacity: first ? '100%' : '50%' }}>
				{i != 0 && <ChevronRightIcon />}
				<Tag key={tag} present={props.subset.get(tag) !== undefined}>
					{tag}
				</Tag>
			</p>
		);

		if (set) {
			first = false;
		}
	}

	return <Tags>{parts}</Tags>;
};

const TooltipWrapper = tw.div`flex items-start gap-1 flex-col`;
const TooltipTitle = tw.h2`font-bold`;
const Divider = tw.hr`border-gray-100 w-full mb-2`;

const TagsTooltip: React.VFC<{
	subset: MetaSubset<readonly (string | readonly string[])[], unknown>;
}> = (props) => {
	return (
		<TooltipWrapper>
			<TooltipTitle>Supported meta tags</TooltipTitle>
			<Divider />
			{props.subset.subset.map((tag) =>
				typeof tag === 'string' ? (
					<PriorityTags key={tag} subset={props.subset} tags={[tag]} />
				) : (
					<PriorityTags key={tag.join(' ')} subset={props.subset} tags={tag} />
				)
			)}
		</TooltipWrapper>
	);
};

const Issue = styled.li({
	...tw`relative pl-4`,
	'&:before': tw`content-["-"] absolute left-0`,
});

const IssuesTooltip: React.VFC<{ issues: string[] }> = (props) => {
	return (
		<TooltipWrapper>
			<TooltipTitle>Potential issues</TooltipTitle>
			<Divider />
			<ul>
				{props.issues.map((issue) => (
					<Issue>{issue}</Issue>
				))}
			</ul>
		</TooltipWrapper>
	);
};

const Header = tw.div`flex justify-between items-center px-4 py-2 bg-gray-100`;
const Title = tw.div`font-bold`;
const InfoBar = tw.div`flex gap-8 items-center`;
const IssuesWarning = tw.p`text-yellow-500`;
const WarningIcon = tw(RiAlarmWarningLine)`inline-block mr-1 text-lg mb-1`;
const InfoOutlineIcon = tw(RiInformationLine)`text-lg text-gray-500`;

const Preview: React.FC<{
	title: string;
	subset: MetaSubset<readonly (string | readonly string[])[], unknown>;
	issues?: string[];
}> = (props) => {
	return (
		<div>
			<Header>
				<Title>{props.title}</Title>
				<InfoBar>
					{props.issues && props.issues?.length > 0 && (
						<Tippy
							content={<IssuesTooltip issues={props.issues} />}
							theme="light"
							animation="shift-toward-subtle"
							placement="bottom"
						>
							<IssuesWarning>
								<WarningIcon />
								{props.issues.length} potential issue
								{props.issues.length !== 1 ? 's' : ''} found!
							</IssuesWarning>
						</Tippy>
					)}
					<Tippy
						content={<TagsTooltip subset={props.subset} />}
						theme="light"
						animation="shift-toward-subtle"
						placement="bottom"
					>
						<div>
							<InfoOutlineIcon />
						</div>
					</Tippy>
				</InfoBar>
			</Header>
			{props.children}
		</div>
	);
};

export default Preview;
