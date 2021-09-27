import React from 'react';

import { useAuth } from 'contexts/AuthContext';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserOrders } from 'utils/firebaseGetters';

import {
	Table,
	TableBody,
	TableRow,
	TableCell,
} from 'components/Table/TableElements';

import { OrdersTableWrapper } from './UserOrdersElements';

import Overall from './Overall';
const UserOrders = () => {
	const { currentUser } = useAuth();

	const { data } = useFirestoreQuery(getUserOrders(currentUser.uid));
	return (
		<OrdersTableWrapper>
			<Table>
				<TableBody>
					<TableRow backgroundColor="#93949417" fontW="bold">
						<TableCell>ID</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Total</TableCell>
						<TableCell>Details</TableCell>
					</TableRow>
					{data && data.map((el, i) => <Overall key={i} el={el} />)}
				</TableBody>
			</Table>
		</OrdersTableWrapper>
	);
};

export default UserOrders;
