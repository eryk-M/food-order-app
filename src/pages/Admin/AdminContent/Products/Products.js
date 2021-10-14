import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import {
	AdminProductsList,
	AdminProductsEdit,
	AdminProductsAdd,
} from 'pages';
import { Info } from 'components';

const Products = () => {
	return (
		<>
			<Info>
				- Data in products panel are coming from different collection
				to prevent damage to the main page. You can easily test add,
				edit and delete functions only in admin panel area.
			</Info>
			<Switch>
				<Route
					path="/admin/products"
					exact
					component={AdminProductsList}
				/>
				<Route
					path="/admin/products/add"
					exact
					component={AdminProductsAdd}
				/>
				<Route
					path="/admin/products/:id"
					exact
					component={AdminProductsEdit}
				/>
				<Route>
					<Redirect to="/404" />
				</Route>
			</Switch>
		</>
	);
};

export default Products;
