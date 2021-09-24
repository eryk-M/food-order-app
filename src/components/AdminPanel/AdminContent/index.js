import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Products from './Products';
import Users from './Users';
import Dashboard from './Dashboard';
// import Info from './';
import Info from './Info';
const AdminContent = () => {
	return (
		<>
			<Info />
			<Switch>
				<Route path="/admin" exact component={Dashboard} />
				<Route path="/admin/products" component={Products} />
				<Route path="/admin/users" exact component={Users} />
			</Switch>
		</>
	);
};

export default AdminContent;
