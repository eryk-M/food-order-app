import React from 'react';

import { useAuth } from 'contexts/AuthContext';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserOrders } from 'utils/firebaseGetters';

import {
	Table,
	TableBody,
	TableRow,
	TableHead,
	TableCellHead,
} from 'components/Table/TableElements';

import { OrdersTableWrapper } from './UserOrdersElements';

import Overall from './Overall';
const UserOrders = () => {
	const { currentUser } = useAuth();

	const { data } = useFirestoreQuery(getUserOrders(currentUser.uid));
	return (
		<OrdersTableWrapper>
			<Table>
				<TableHead>
					<TableRow fontW="bold">
						<TableCellHead>ID</TableCellHead>
						<TableCellHead>Date</TableCellHead>
						<TableCellHead>Status</TableCellHead>
						<TableCellHead>Total</TableCellHead>
						<TableCellHead width="15rem">Details</TableCellHead>
					</TableRow>
				</TableHead>
				<TableBody>
					{data && data.map((el, i) => <Overall key={i} el={el} />)}
				</TableBody>
			</Table>
		</OrdersTableWrapper>
	);
};

export default UserOrders;
