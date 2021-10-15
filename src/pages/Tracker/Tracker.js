import React from 'react';

import {
	Route,
	useLocation,
	Switch,
	Redirect,
} from 'react-router-dom';

import { TrackerForm, TrackerDetails } from 'pages';

export const Tracker = () => {
	const { orderId } = useLocation();

	return (
		<Switch>
			<Route
				path="/food-tracker"
				exact
				render={() => <TrackerForm orderId={orderId} />}
			/>
			<Route
				path="/food-tracker/order"
				exact
				component={TrackerDetails}
			/>
			<Route>
				<Redirect to="/404" />
			</Route>
		</Switch>
	);
};
