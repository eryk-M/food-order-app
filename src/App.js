import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import { GlobalStyle } from './globalStyles';

import {
	Footer,
	NavBar,
	NavBarBurger,
	PrivateRoute,
} from 'components';

import {
	Tracker,
	User,
	Login,
	Home,
	Cart,
	ProductItem,
	Products,
	Admin,
} from 'pages';
import {
	CartProvider,
	APIProvider,
	AdminAPIProvider,
	AuthProvider,
} from 'contexts';

import { ScrollToTop } from 'utils/scrollToTop';

const routes = (
	<Route>
		<Route path="/" exact component={Home} />
		<Route path="/product/:id" exact component={ProductItem} />
		<Route path="/login" component={Login} />
		<Route path="/signup" component={Login} />
		<Route path="/forgot-password" component={Login} />
		<Route path="/cart" component={Cart} />
		<Route path="/food-tracker" component={Tracker} />
		<Route path="/products" component={Products} />

		<PrivateRoute path="/user" component={User} />

		<AdminAPIProvider>
			<PrivateRoute path="/admin" component={Admin} />
		</AdminAPIProvider>
	</Route>
);

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
						<ScrollToTop>
							<Switch>{routes}</Switch>
						</ScrollToTop>
						<Footer />
					</Router>
				</APIProvider>
			</CartProvider>
		</AuthProvider>
	);
}

export default App;
