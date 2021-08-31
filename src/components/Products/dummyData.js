import burgerClassic from '../../images/burger-classic.jpg';
import burgerDouble from '../../images/burger-double.jpg';
import burgerChicken from '../../images/burger-chicken.jpg';
import chickenCrispy from '../../images/chicken-crispy.jpg';
import chickenSalad from '../../images/chicken-salad.jpg';
import chickenShashlik from '../../images/chicken-shashlik.jpg';

export const data = [
	{
		img: burgerClassic,
		alt: 'Burger',
		name: 'Classic Burger',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 19.99,
		button: 'Add to Cart',
		ingredients: [
			'Roll',
			'Meat',
			'Salad',
			'Tomato',
			'Cheese',
			'Mayonese',
		],
		category: 'Burger',
	},
	{
		img: burgerDouble,
		alt: 'Burger',
		name: 'Double Burger',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 16.99,
		button: 'Add to Cart',
		ingredients: [
			'Roll',
			'2x Meat',
			'Cucumber',
			'Tomato',
			'Cheese',
			'Sauce BBQ',
			'Bacon',
		],
		category: 'Burger',
	},
	{
		img: burgerChicken,
		alt: 'Burger',
		name: 'Chicken Burger',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 14.99,
		ingredients: [
			'Roll',
			'Chicken',
			'Salad',
			'Tomato',
			'Cheese',
			'Mayonese',
			'Onion',
		],
		button: 'Add to Cart',
		category: 'Burger',
	},
	{
		img: chickenCrispy,
		alt: 'Crispy Chicken',
		name: 'Crispy Chicken',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 12.99,
		button: 'Add to Cart',
		ingredients: ['5x Crispy chicken wings', 'Garlic Sauce'],
		category: 'Chicken',
	},
	{
		img: chickenSalad,
		alt: 'Chicken Salad',
		name: 'Chicken Salad',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 15.99,
		button: 'Add to Cart',
		ingredients: [
			'Chicken tenderloins',
			'Broccoli',
			'Salad',
			'Tomato',
			'Oil',
		],
		category: 'Chicken',
	},
	{
		img: chickenShashlik,
		alt: 'Chicken Shashlik',
		name: 'Chicken Shashlik',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 11.99,
		button: 'Add to Cart',
		ingredients: [
			'Grilled Chicken',
			'Tomato',
			'Fries',
			'Onion',
			'Salad',
		],
		category: 'Chicken',
	},
];
