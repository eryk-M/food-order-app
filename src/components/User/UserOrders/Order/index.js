import React from 'react';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import {
	OrderWrapper,
	OrderHeading,
	OrderInfo,
	OrderContent,
} from './OrderElements';

const Order = ({ el, open }) => {
	return (
		<SlideDown className="my-dropdown-slidedown" closed={open}>
			<OrderWrapper>
				<OrderContent>
					<OrderHeading>Order Info:</OrderHeading>
					<br />
					{el.orderInfo.map((order, i) => (
						<OrderInfo key={i}>
							{order.quantity}x {order.name} $
							{(order.quantity * order.price).toFixed(2)}
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
					{el.payment}
				</OrderContent>
			</OrderWrapper>
		</SlideDown>
	);
};

export default Order;
