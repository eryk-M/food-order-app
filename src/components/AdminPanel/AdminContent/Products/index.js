import React from 'react';

import { Switch, Route } from 'react-router-dom';

import List from './List';
import Edit from './Edit';
const Products = () => {
	return (
		<Switch>
			<Route path="/admin/products" exact component={List} />
			{/* <Route path="/admin/products/add" exact component={Add} /> */}
			<Route path="/admin/products/:id" exact component={Edit} />
		</Switch>
	);
};

export default Products;
