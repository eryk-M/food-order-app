import React, { useState } from 'react';

import Order from '../Order';

import {
	OrdersTableRow,
	OrdersTableCell,
	OrdersTableButton,
} from '../UserOrdersElements';

import { IoIosArrowDown } from 'react-icons/io';

const Overall = ({ el }) => {
	const [open, setOpen] = useState(true);

	const iconRotate = {
		transform: 'rotate(180deg)',
	};

	return (
		<>
			<OrdersTableRow>
				<OrdersTableCell>{el.orderId}</OrdersTableCell>
				<OrdersTableCell>17.09.2021</OrdersTableCell>
				<OrdersTableCell>Processing</OrdersTableCell>
				<OrdersTableCell>${el.totalPrice}</OrdersTableCell>
				<OrdersTableCell>
					<OrdersTableButton
						onClick={() => setOpen((currOpen) => !currOpen)}
					>
						View
						<IoIosArrowDown style={open ? null : iconRotate} />
					</OrdersTableButton>
				</OrdersTableCell>
			</OrdersTableRow>
			<OrdersTableRow>
				<OrdersTableCell
					colSpan={5}
					className="cell-word-wrap"
					padding={0}
				>
					<Order el={el} open={open} />
				</OrdersTableCell>
			</OrdersTableRow>
		</>
	);
};

export default Overall;
