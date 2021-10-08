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

import {
	OrdersTableWrapper,
	OrdersNoData,
	OrdersNoDataWrapper,
	OrdersNoDataP,
} from './UserOrdersElements';

import Overall from './Overall';
import Loader from 'components/Loader';

import NoData from 'images/no-data.svg';
const UserOrders = () => {
	const { currentUser } = useAuth();

	const { data, loading } = useFirestoreQuery(
		getUserOrders(currentUser.uid)
	);
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
			{loading && <Loader primary high margincenter />}
			{data?.length === 0 && (
				<OrdersNoDataWrapper>
					<OrdersNoDataP>You didnt order anything yet</OrdersNoDataP>
					<OrdersNoData src={NoData} alt="No data svg" />
				</OrdersNoDataWrapper>
			)}
		</OrdersTableWrapper>
	);
};

export default UserOrders;
