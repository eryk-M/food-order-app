import React from 'react';

import Hero from 'components/Hero';
import Story from './Story';
// import Offer from 'components/Offer';
import TopProducts from './TopProducts';
//OLD
import Products from 'components/ProductsOLD';

const Home = () => {
	return (
		<>
			<Hero />
			<Story />
			<TopProducts />
			{/* <Offer /> */}
			<Products />
		</>
	);
};

export default Home;
