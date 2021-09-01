import React, { useState, useLayoutEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import { GlobalStyle } from './globalStyles';

import Home from './pages/Home';
import Product from './pages/Product';
import NavBar from './components/NavBar';
import NavBarBurger from './components/NavBurger';
function App() {
	//navbar
	const [hidden, setHidden] = useState(true);

	const toggleClass = () => {
		setHidden(!hidden);
	};

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
		<div className="App">
			<Router>
				<NavBar width={width} toggle={toggleClass} />
				<NavBarBurger hidden={hidden} toggle={toggleClass} />
				<GlobalStyle />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/product/:id" exact component={Product} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
