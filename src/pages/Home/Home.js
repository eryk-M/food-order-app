import React from 'react';
import { Hero, Offer } from 'components';
import { Story, TopProducts } from 'pages';

export const Home = () => {
	return (
		<>
			<Hero />
			<Story />
			<TopProducts />
			<Offer />
		</>
	);
};
