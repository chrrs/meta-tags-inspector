export interface Meta {
	tags: Record<string, string>;
}

export function getTag(meta: Meta, name: string | string[]): string | undefined {
	if (typeof name === 'string') {
		return meta.tags[name];
	} else {
		for (const s of name) {
			const tag = meta.tags[s];
			if (tag) {
				return tag;
			}
		}

		return undefined;
	}
}
