import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { AdminOrdersList, AdminOrdersOrder } from 'pages';

const Orders = () => {
	return (
		<Switch>
			<Route path="/admin/orders" exact component={AdminOrdersList} />
			<Route
				path="/admin/orders/:id"
				exact
				component={AdminOrdersOrder}
			/>
			{/* <Route path="/admin/products/:id" exact component={Edit} /> */}
		</Switch>
	);
};

export default Orders;
