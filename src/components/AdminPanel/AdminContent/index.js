import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Products from './Products';
import Users from './Users';
import Dashboard from './Dashboard';
import Orders from './Orders';

import Info from './Info';
const AdminContent = () => {
	return (
		<>
			<Info />
			<Switch>
				<Route path="/admin" exact component={Dashboard} />
				<Route path="/admin/products" component={Products} />
				<Route path="/admin/users" exact component={Users} />
				<Route path="/admin/orders" component={Orders} />
			</Switch>
		</>
	);
};

export default AdminContent;
