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

	subset<S extends readonly string[]>(subset: S) {
		return new MetaSubset(this, subset);
	}
}

export class MetaSubset<S extends readonly string[], T = S[number]> {
	meta: Meta;
	subset: S;

	constructor(meta: Meta, subset: S) {
		this.meta = meta;
		this.subset = subset;
	}

	get(...name: T[]): string | undefined {
		// @ts-ignore
		return this.meta.get(...name);
	}

	getImage(url: string | undefined, ...name: T[]): string | undefined {
		let imageUrl = this.get(...name);
		return imageUrl && new URL(imageUrl, url).href;
	}
}
