import React from 'react';

import { Switch, Route } from 'react-router-dom';

import List from './List';
import Order from './Order';

const Orders = () => {
	return (
		<Switch>
			<Route path="/admin/orders" exact component={List} />
			<Route path="/admin/orders/:id" exact component={Order} />
			{/* <Route path="/admin/products/:id" exact component={Edit} /> */}
		</Switch>
	);
};

export default Orders;
