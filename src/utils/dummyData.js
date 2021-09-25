import burgerClassic from 'images/burger-classic_cut.jpg';
import burgerDouble from 'images/burger-double_cut.jpg';
import burgerChicken from 'images/burger-chicken_cut.jpg';
import chickenCrispy from 'images/chicken-crispy_cut.jpg';
import chickenSalad from 'images/chicken-salad_cut.jpg';
import chickenShashlik from 'images/chicken-shashlik_cut.jpg';
import lemonade from 'images/lemonade.jpg';
import orangeJuice from 'images/orange_juice.jpg';
import iceShake from 'images/ice_shake.jpg';
import belgianFries from 'images/belgian_fries.jpg';
import fries from 'images/fries.jpg';

export const dummyData = [
	{
		id: 1,
		img: 'burger-classic_cut',
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
		category: 'Burgers',
		quantity: 1,
		sale: true,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 4,
		img: 'chicken-crispy_cut',
		alt: 'Crispy Chicken',
		name: 'Crispy Chicken',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 12.99,
		button: 'Add to Cart',
		ingredients: ['5x Crispy chicken wings', 'Garlic Sauce'],
		category: 'Chicken',
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 3,
		img: 'burger-chicken_cut',
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
		category: 'Burgers',
		quantity: 1,
		sale: true,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},

	{
		id: 5,
		img: 'chicken-salad_cut',
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
		quantity: 1,
		sale: true,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 2,
		img: 'burger-double_cut',
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
		category: 'Burgers',
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 6,
		img: 'chicken-shashlik_cut',
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
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: false,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 7,
		img: 'lemonade',
		alt: 'Lemonade',
		name: 'Lemonade',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 3.99,
		button: 'Add to cart',
		ingredients: ['Mint', 'Lime', 'Ice', 'Water'],
		category: 'Drinks',
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},

	{
		id: 11,
		img: 'fries',
		alt: 'Fries',
		name: 'Fries',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 4.99,
		button: 'Add to cart',
		ingredients: ['Fries'],
		category: 'Fries',
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 8,
		img: 'orange_juice',
		alt: 'Orange Juice',
		name: 'Orange Juice',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 2.99,
		button: 'Add to cart',
		ingredients: ['Orange', 'Mango'],
		category: 'Drinks',
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 9,
		img: 'ice_shake',
		alt: 'iceShake',
		name: 'Ice Shake',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 6.99,
		button: 'Add to cart',
		ingredients: ['Strawberry', 'Cream', 'Chocolate', 'Ice'],
		category: 'Drinks',
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
	{
		id: 10,
		img: 'belgian_fries',
		alt: 'Belgian Fries',
		name: 'Belgian Fries',
		desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
		price: 6.99,
		button: 'Add to cart',
		ingredients: ['Fries'],
		category: 'Fries',
		quantity: 1,
		sale: false,
		discountPrice: 0,
		availability: true,
		avgRating: 0,
		popularity: 0,
		ratingCount: 0,
	},
];
