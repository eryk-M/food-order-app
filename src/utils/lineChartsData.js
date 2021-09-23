import faker from 'faker';

const generateRandomArray = (min, max, days) => {
	let array = [];
	for (let i = 0; i < days; i++) {
		const randomNumber = faker.datatype.number({
			min: min,
			max: max,
		});
		array.push(randomNumber);
	}
	return array;
};

export const generateArrayDays = (days) => {
	let array = [];
	for (let i = 1; i < days + 1; i++) {
		array.push(i);
	}
	return array;
};

export const salesDataYear = () =>
	generateRandomArray(1200, 2000, 12);

export const salesDataMonth = () => generateRandomArray(40, 150, 30);

export const ordersDataYear = () => generateRandomArray(70, 140, 12);

export const ordersDataMonth = () => generateRandomArray(10, 20, 30);
