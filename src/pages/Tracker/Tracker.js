import React from 'react';

import { Route, useLocation } from 'react-router-dom';

import { TrackerForm, TrackerDetails } from 'pages';

export const Tracker = () => {
	const { orderId } = useLocation();

	return (
		<>
			<Route
				path="/food-tracker"
				exact
				render={() => <TrackerForm orderId={orderId} />}
			/>
			<Route path="/food-tracker/order" component={TrackerDetails} />
		</>
	);
};
