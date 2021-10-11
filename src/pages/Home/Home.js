import React from 'react';
import { Hero, Offer } from 'components';
import { Story, TopProducts } from 'pages';
//OLD
import Products from 'components/ProductsOLD';

export const Home = () => {
	return (
		<>
			<Hero />
			<Story />
			<TopProducts />
			<Offer />
			<Products />
		</>
	);
};
