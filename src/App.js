import React, { useState, useLayoutEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import User from './pages/User';

import Home from './pages/Home';
import Product from './pages/Product';
import NavBar from './components/NavBar';
import NavBarBurger from './components/NavBurger';
import Checkout from './pages/Checkout';

import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';

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
		<AuthProvider>
			<ProductsProvider>
				<CartProvider>
					<Router>
						<NavBar width={width} toggle={toggleClass} />
						<NavBarBurger hidden={hidden} toggle={toggleClass} />
						<GlobalStyle />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/product/:id" exact component={Product} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={Login} />
							<Route path="/forgot-password" component={Login} />
							<Route path="/cart" component={Checkout} />

							<PrivateRoute path="/user" exact component={User} />
							<PrivateRoute
								path="/user/change-password"
								exact
								component={User}
							/>
							<PrivateRoute
								path="/user/orders"
								exact
								component={User}
							/>
						</Switch>
					</Router>
				</CartProvider>
			</ProductsProvider>
		</AuthProvider>
	);
}

export default App;
