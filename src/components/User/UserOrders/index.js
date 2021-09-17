import React from 'react';

import { useAuth } from 'contexts/AuthContext';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserOrders } from 'utils/firebaseGetters';

import {
	OrdersTable,
	OrdersTableBody,
	OrdersTableRow,
	OrdersTableCell,
	OrdersTableWrapper,
} from './UserOrdersElements.js';

import Overall from './Overall';
const UserOrders = () => {
	const { currentUser } = useAuth();

	const { data } = useFirestoreQuery(getUserOrders(currentUser.uid));
	return (
		<OrdersTableWrapper>
			<OrdersTable>
				<OrdersTableBody>
					<OrdersTableRow backgroundColor="#93949417" fontW="bold">
						<OrdersTableCell>ID</OrdersTableCell>
						<OrdersTableCell>Date</OrdersTableCell>
						<OrdersTableCell>Status</OrdersTableCell>
						<OrdersTableCell>Total</OrdersTableCell>
						<OrdersTableCell>Details</OrdersTableCell>
					</OrdersTableRow>
					{data && data.map((el, i) => <Overall key={i} el={el} />)}
				</OrdersTableBody>
			</OrdersTable>
		</OrdersTableWrapper>
	);
};

export default UserOrders;
