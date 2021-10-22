import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
	AdminProducts,
	// AdminDashboard,
	AdminOrders,
	AdminCoupons,
	AdminQuiz,
} from 'pages';
import { Loader } from 'components';
const AdminDashboard = loadable(
	() => import('./Dashboard/Dashboard'),
	{
		fallback: <Loader primary veryhigh margincenter />,
	}
);

export const AdminContent = () => {
	return (
		<>
			<Switch>
				<Route path="/admin" exact component={AdminDashboard} />
				<Route path="/admin/products" component={AdminProducts} />
				<Route path="/admin/orders" component={AdminOrders} />
				<Route path="/admin/coupons" component={AdminCoupons} />
				<Route path="/admin/quiz" component={AdminQuiz} />

				<Route>
					<Redirect to="/404" />
				</Route>
			</Switch>
		</>
	);
};
