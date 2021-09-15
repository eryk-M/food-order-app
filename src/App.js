import React, { useState } from 'react';
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
import Tracker from './pages/Tracker';
import ProductsFilter from './pages/ProductsFilter';

import { CartProvider } from './contexts/CartContext';
import { APIProvider } from './contexts/APIContext';
function App() {
	//navbar
	const [hidden, setHidden] = useState(true);

	const toggleClass = () => {
		setHidden(!hidden);
	};

	return (
		<AuthProvider>
			<CartProvider>
				<APIProvider>
					<Router>
						<NavBar toggle={toggleClass} />
						<NavBarBurger hidden={hidden} toggle={toggleClass} />
						<GlobalStyle />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/product/:id" exact component={Product} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={Login} />
							<Route path="/forgot-password" component={Login} />
							<Route path="/cart" component={Checkout} />
							<Route path="/food-tracker" component={Tracker} />
							<Route path="/products" component={ProductsFilter} />

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
				</APIProvider>
			</CartProvider>
		</AuthProvider>
	);
}

export default App;
