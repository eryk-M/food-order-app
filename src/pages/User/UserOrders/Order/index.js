import React from 'react';

import {
	OrderWrapper,
	OrderHeading,
	OrderInfo,
	OrderContent,
} from './OrderElements';
import {
	CashIcon,
	CreditCardIcon,
	TableCell,
	TableRow,
} from 'components';

import { useWindowSize } from 'hooks';
import { OrdersTableRow } from '../UserOrdersElements';
const Order = ({ el, open }) => {
	const { width } = useWindowSize();

	const returnUserStatus = (step) => {
		const text = [
			'Order placed',
			'Prepairing',
			'Cooking',
			'Delivery',
			'Done',
			'Cancelled',
		];
		return text[step];
	};

	if (width <= 460) {
		return (
			<OrdersTableRow
				style={{
					backgroundColor: 'var(--color-background-grey-light)',
				}}
				className={open ? 'order-closed' : 'order-opened'}
			>
				<TableCell data-label="Order info">
					{el.orderInfo.map((order, i) => (
						<OrderInfo key={i}>
							{order.quantity}x {order.name}
						</OrderInfo>
					))}
				</TableCell>
				<TableCell data-label="Address:">
					{el.userInfo.name}
					<br />
					{el.userInfo.address}
					<br />
					{el.userInfo.city}
					<br />
					{el.userInfo.zip}
					<br />
					{el.userInfo.phone}
				</TableCell>
				<TableCell data-label="Payment">
					{el.payment === 2 ? (
						<>
							{' '}
							<CashIcon /> Cash{' '}
						</>
					) : (
						<>
							<CreditCardIcon /> Card{' '}
						</>
					)}
				</TableCell>
				<TableCell data-label="Total price:">
					${el.totalPrice}
				</TableCell>
				<TableCell data-label="Detailed status:">
					{returnUserStatus(el.step)}
				</TableCell>
			</OrdersTableRow>
		);
	}

	return (
		<TableRow
			className={`cell-word-wrap ${
				open ? 'order-closed' : 'order-opened'
			}`}
			padding={0}
		>
			<td colSpan={5}>
				<OrderWrapper>
					<OrderContent>
						<OrderHeading>Order Info:</OrderHeading>
						<br />
						{el.orderInfo.map((order, i) => (
							<OrderInfo key={i}>
								{order.quantity}x {order.name}
							</OrderInfo>
						))}
					</OrderContent>
					<OrderContent>
						<OrderHeading>Address:</OrderHeading>
						<br />
						<OrderInfo>
							{el.userInfo.name}
							<br />
							{el.userInfo.address}
							<br />
							{el.userInfo.city}
							<br />
							{el.userInfo.zip}
							<br />
							{el.userInfo.phone}
						</OrderInfo>
					</OrderContent>
					<OrderContent>
						<OrderHeading>Payment:</OrderHeading>
						<br />
						{el.payment === 2 ? (
							<>
								{' '}
								<CashIcon /> Cash{' '}
							</>
						) : (
							<>
								<CreditCardIcon /> Card{' '}
							</>
						)}
					</OrderContent>
					<OrderContent>
						<OrderHeading>Total price:</OrderHeading>
						<br />${el.totalPrice}
					</OrderContent>
					<OrderContent>
						<OrderHeading>Detailed status:</OrderHeading>
						<br />
						{returnUserStatus(el.step)}
					</OrderContent>
				</OrderWrapper>
			</td>
		</TableRow>
	);
};

export default Order;
