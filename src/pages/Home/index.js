import React, { useLayoutEffect, useState, useContext } from 'react';

import Hero from '../../components/Hero';
import Products from '../../components/Products';

import { CartContext } from '../../contexts/CartContext';
const Home = () => {
	const { state } = useContext(CartContext);

	return (
		<>
			<Hero />
			<Products />
		</>
	);
};

export default Home;
