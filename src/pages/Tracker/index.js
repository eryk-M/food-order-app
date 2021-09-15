import React from 'react';

import { Route, useLocation } from 'react-router-dom';

import TrackerForm from 'components/Tracker/TrackerForm';
import TrackerDetails from 'components/Tracker/TrackerDetails';

const Tracker = () => {
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

export default Tracker;
