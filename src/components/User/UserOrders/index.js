import React from 'react';

import { useAuth } from 'contexts/AuthContext';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserOrders } from 'utils/firebaseGetters';

const UserOrders = () => {
	const { currentUser } = useAuth();

	const { data, loading } = useFirestoreQuery(
		getUserOrders(currentUser.uid)
	);

	console.log(loading);

	return <div>UserOrders</div>;
};

export default UserOrders;
