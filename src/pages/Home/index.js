import React, { useLayoutEffect, useState } from 'react';

import Hero from '../../components/Hero';
import NavBar from '../../components/NavBar';
import NavBarBurger from '../../components/NavBurger';

const Home = () => {
	function useWindowSize() {
		const [size, setSize] = useState([0]);
		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth]);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return size;
	}

	const [width] = useWindowSize();
	return (
		<>
			<NavBar width={width} />
			<NavBarBurger />
			<Hero />
		</>
	);
};

export default Home;
