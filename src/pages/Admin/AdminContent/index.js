import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Products from './Products';
import Users from './Users';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Coupons from './Coupons';

import Info from '../../../components/Admin/Info';
const AdminContent = () => {
	return (
		<>
			<Info />
			<Switch>
				<Route path="/admin" exact component={Dashboard} />
				<Route path="/admin/products" component={Products} />
				<Route path="/admin/users" exact component={Users} />
				<Route path="/admin/orders" component={Orders} />
				<Route path="/admin/coupons" component={Coupons} />
			</Switch>
		</>
	);
};

export default AdminContent;
