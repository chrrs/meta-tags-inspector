export class Meta {
	tags: Record<string, string> = {};

	get(name: string | string[]): string | undefined {
		if (typeof name === 'string') {
			return this.tags[name];
		} else {
			for (const s of name) {
				const tag = this.tags[s];
				if (tag) {
					return tag;
				}
			}

			return undefined;
		}
	}

	update(tags: Record<string, string>) {
		this.tags = tags;
	}

	subset<S extends readonly string[]>(subset: S) {
		return new MetaSubset(this, subset);
	}
}

export class MetaSubset<S extends readonly string[], T = keyof S> {
	meta: Meta;
	subset: S;

	constructor(meta: Meta, subset: S) {
		this.meta = meta;
		this.subset = subset;
	}

	get(name: T | T[]): string | undefined {
		// @ts-ignore
		return this.meta.get(name);
	}
}
