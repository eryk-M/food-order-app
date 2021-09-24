export const capitalizeEachWord = (string) =>
	string
		.split(' ')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
