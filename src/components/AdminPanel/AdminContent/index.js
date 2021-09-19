import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Products from './Products';
import Users from './Users';
import Dashboard from './Dashboard';

const AdminContent = () => {
	return (
		<Switch>
			<Route path="/admin" exact component={Dashboard} />
			<Route path="/admin/products" component={Products} />
			<Route path="/admin/users" exact component={Users} />
		</Switch>
	);
};

export default AdminContent;
