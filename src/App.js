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
	ConnectionStatus,
} from 'components';
import { RedirectFromAuth } from 'components/RedirectFromAuth/RedirectFromAuth';
import {
	Tracker,
	Login,
	Home,
	Cart,
	ProductItem,
	Products,
	NotFound,
} from 'pages';
import { CartProvider, APIProvider, AuthProvider } from 'contexts';

import { ScrollToTop } from 'utils/scrollToTop';

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
					<ConnectionStatus />
					<Router>
						<NavBar toggle={toggleClass} />
						<NavBarBurger hidden={hidden} toggle={toggleClass} />
						<GlobalStyle />
						<ScrollToTop>
							<Switch>
								<Route path="/" exact component={Home} />
								<Route
									path="/product/:id"
									exact
									component={ProductItem}
								/>
								<Route path="/login" exact component={Login} />
								<Route path="/signup" exact component={Login} />

								<Route
									path="/forgot-password"
									exact
									component={Login}
								/>

								<Route path="/cart" component={Cart} />
								<Route path="/food-tracker" component={Tracker} />
								<Route path="/products" exact component={Products} />
								<Route path="/404" exact component={NotFound} />
								{/* problem with handling 404 */}
								<RedirectFromAuth />
							</Switch>
						</ScrollToTop>
						<Footer />
					</Router>
				</APIProvider>
			</CartProvider>
		</AuthProvider>
	);
}

export default App;
