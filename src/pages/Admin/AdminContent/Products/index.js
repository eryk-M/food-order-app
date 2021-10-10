import React from 'react';

import { Switch, Route } from 'react-router-dom';

import List from './List';
import Edit from './Edit';
import Add from './Add';
import Info from 'components/Admin/Info';

const Products = () => {
	return (
		<>
			<Info>
				- Data in products panel are coming from different collection
				to prevent damage to the main page. You can easily test add,
				edit and delete functions only in admin panel area.
			</Info>
			<Switch>
				<Route path="/admin/products" exact component={List} />
				<Route path="/admin/products/add" exact component={Add} />
				<Route path="/admin/products/:id" exact component={Edit} />
			</Switch>
		</>
	);
};

export default Products;
