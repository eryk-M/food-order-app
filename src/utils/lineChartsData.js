import faker from 'faker';
const generateRandomArray = (min, max, days, total) => {
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

//settings
export const totalOrdersSettings = {
	spanColor: '#3ac47d',
	top: 'Total orders',
	bottom: 'Total orders number',
	number: faker.datatype.number({ min: 1200, max: 1500 }),
};

export const totalClientsSettings = {
	spanColor: '#f7b924',
	top: 'Total income',
	bottom: 'Total clients profit',
	number: `$${faker.datatype.number({ min: 31000, max: 42000 })}`,
};

export const totalUsersSettings = {
	spanColor: '#d92550',
	top: 'Total users',
	bottom: 'People registered',
	number: faker.datatype.number({ min: 150, max: 400 }),
};

export const chartOrdersYear = {
	array: ordersDataYear,
	days: generateArrayDays(12),
	color: '#f7b924',
	text: faker.datatype.number({ min: 800, max: 1100 }),
	span: 'orders last years',
};
export const chartSalesYear = {
	array: salesDataYear,
	days: generateArrayDays(12),
	color: '#45de66',
	text: `$${chartOrdersYear.text * 20}`,
	span: 'sales last year',
};

export const chartOrdersMonth = {
	array: ordersDataMonth,
	days: generateArrayDays(30),
	color: '#1fa2ff',
	text: faker.datatype.number({ min: 70, max: 110 }),
	span: 'orders last month',
};
export const chartSalesMonth = {
	array: salesDataMonth,
	days: generateArrayDays(30),
	color: '#e7272d',
	text: `$${chartOrdersMonth.text * 20}`,
	span: 'sales last month',
};
