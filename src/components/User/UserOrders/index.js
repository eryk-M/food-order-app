import React, { useState, useEffect } from 'react';

import { useApi } from 'contexts/APIContext';
import { useAuth } from 'contexts/AuthContext';
const UserOrders = () => {
	const { getUserOrders } = useApi();
	const { currentUser } = useAuth();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (orders.length === 0) {
			getUserOrders(currentUser.uid).then((data) => {
				setOrders(data);
			});
		}
	}, [currentUser.uid, orders, getUserOrders]);

	console.log(orders);

	return <div>UserOrders</div>;
};

export default UserOrders;
