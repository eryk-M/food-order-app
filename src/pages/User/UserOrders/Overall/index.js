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
				<TableCell>{el.orderId}</TableCell>
				<TableCell>17.09.2021</TableCell>
				<TableCell>
					<Status step={el.step} />
				</TableCell>
				<TableCell>${el.totalPrice}</TableCell>
				<TableCell>
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
				<TableCell colSpan={5} className="cell-word-wrap" padding={0}>
					<Order el={el} open={open} />
				</TableCell>
			</TableRow>
		</>
	);
};

export default Overall;
