export function debounce<A extends unknown[] = unknown[], R = void>(
	fn: (...args: A) => R,
	ms: number
): (...args: A) => Promise<R> {
	let timer: NodeJS.Timeout;

	return (...args: A): Promise<R> =>
		new Promise((resolve) => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				resolve(fn(...args));
			}, ms);
		});
}
