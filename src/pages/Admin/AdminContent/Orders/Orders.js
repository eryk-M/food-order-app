import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
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
			<Route>
				<Redirect to="/404" />
			</Route>
		</Switch>
	);
};

export default Orders;
