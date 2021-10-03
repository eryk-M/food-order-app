import React, { useState } from 'react';

import Order from '../Order';

import {
	TableRow,
	TableCell,
	TableButton,
} from 'components/Table/TableElements';

import { IoIosArrowDown } from 'react-icons/io';

import Status from 'components/Status';

const Overall = ({ el }) => {
	const [open, setOpen] = useState(true);

	const iconRotate = {
		transform: 'rotate(180deg)',
	};

	return (
		<>
			<TableRow>
				<TableCell data-label="ID">{el.orderId}</TableCell>
				<TableCell data-label="Date">17.09.2021</TableCell>
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
			</TableRow>
			<TableRow>
				<Order el={el} open={open} />
			</TableRow>
		</>
	);
};

export default Overall;
