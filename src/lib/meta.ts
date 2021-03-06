export class Meta {
	tags: Record<string, string>;

	constructor(tags: Record<string, string>) {
		this.tags = tags;
	}

	get(...name: string[]): string | undefined {
		for (const s of name) {
			const tag = this.tags[s];
			if (tag !== undefined) {
				return tag;
			}
		}

		return undefined;
	}

	subset<S extends readonly (string | readonly string[])[]>(subset: S): MetaSubset<S> {
		return new MetaSubset(this, subset);
	}
}

export class MetaSubset<S extends readonly (string | readonly string[])[], T = FlatArray<S, 1>> {
	meta: Meta;
	subset: S;

	constructor(meta: Meta, subset: S) {
		this.meta = meta;
		this.subset = subset;
	}

	get(...name: T[]): string | undefined {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this.meta.get(...name);
	}

	getImage(url: string | undefined, ...name: T[]): string | undefined {
		const imageUrl = this.get(...name);
		return imageUrl && new URL(imageUrl, url).href;
	}
}
