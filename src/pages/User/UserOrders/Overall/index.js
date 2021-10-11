import React, { useState } from 'react';

import Order from '../Order';

import { IoIosArrowDown } from 'react-icons/io';

import { Status, TableCell, TableButton } from 'components';
import { OrdersTableRow } from '../UserOrdersElements';
const Overall = ({ el }) => {
	const [open, setOpen] = useState(true);

	const iconRotate = {
		transform: 'rotate(180deg)',
	};

	const renderDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleDateString();
	};
	return (
		<>
			<OrdersTableRow>
				<TableCell data-label="ID">{el.orderId}</TableCell>
				<TableCell data-label="Date">{renderDate(el.date)}</TableCell>
				<TableCell data-label="Status">
					<Status step={el.step} />
				</TableCell>
				<TableCell data-label="Price">${el.totalPrice}</TableCell>
				<TableCell data-label="Actions">
					<TableButton
						primary
						onClick={() => setOpen((currOpen) => !currOpen)}
					>
						View
						<IoIosArrowDown style={open ? null : iconRotate} />
					</TableButton>
				</TableCell>
			</OrdersTableRow>

			<Order el={el} open={open} />
		</>
	);
};

export default Overall;
