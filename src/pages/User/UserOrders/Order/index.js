import React from 'react';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import {
	OrderWrapper,
	OrderHeading,
	OrderInfo,
	OrderContent,
} from './OrderElements';
import { CashIcon, CreditCardIcon } from 'components/Admin/Icons';
const Order = ({ el, open }) => {
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
	return (
		<SlideDown className="my-dropdown-slidedown" closed={open}>
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
		</SlideDown>
	);
};

export default Order;
