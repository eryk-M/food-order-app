import React, { useState } from 'react';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAdminOneOrder } from 'utils/firebaseGetters';

import {
	MainContainer,
	JustifyCenterContainer,
} from 'components/AdminPanel/Containers';
import { AdminPanelHeading } from 'components/Typography';
import {
	OrderDate,
	OrderWrapper,
	OrderShipping,
	OrderInfo,
	OrderTotal,
	OrderSteps,
	OrderP,
	MiddleWrapper,
	OrderHeading,
	OrderContainer,
	OrderChangeButton,
	UserStatus,
	UserOrderStatus,
	LoaderWrapper,
} from './OrderElements';
import Loader from 'components/Loader';
import { Alert } from 'components/Alert';
import {
	CreditCardIcon,
	CashIcon,
} from 'components/AdminPanel/Icons';

import Status from 'components/Status';

import { useAdminApi } from 'contexts/AdminAPIContext';

const Order = (props) => {
	const { data } = useFirestoreQuery(
		getAdminOneOrder(props.match.params.id)
	);
	const { updateAdminOrderStatus } = useAdminApi();
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const steps = [
		{ step: 1, text: 'Preparing' },
		{ step: 2, text: 'Cooking' },
		{ step: 3, text: 'Delivery' },
		{ step: 4, text: 'Done' },
		{ step: 5, text: 'Cancel' },
	];
	console.log(data);
	const giveDateSpan = (timestamp) => {
		const a = new Date(timestamp);
		let string = a.toLocaleString('pl-PL', { dateStyle: 'short' });
		return (
			<span>
				{string}, {a.getHours()}:
				{a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()}
			</span>
		);
	};
	const handleChangeStatus = async (step) => {
		setShowSuccess(false);
		clearAlert();
		setLoading(true);
		await updateAdminOrderStatus(step, data[0].id);
		setLoading(false);
		setShowSuccess(true);
		showAlert();
	};

	const showAlert = () =>
		setTimeout(() => {
			setShowSuccess(false);
		}, 4000);

	const clearAlert = () => clearTimeout(showAlert);

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
		<MainContainer display="inline-block" minwidth="50%">
			{data && (
				<>
					{loading && (
						<LoaderWrapper>
							<Loader primary />
						</LoaderWrapper>
					)}

					<AdminPanelHeading>
						Order ID: {props.match.params.id}
					</AdminPanelHeading>
					<JustifyCenterContainer>
						{showSuccess && (
							<Alert success top="1rem" right="1rem">
								Updated
							</Alert>
						)}
						<MiddleWrapper>
							<OrderHeading>Status:</OrderHeading>
							<Status step={data[0].step} />
							<UserStatus>
								User status:{' '}
								<UserOrderStatus step={data[0].step}>
									{returnUserStatus(data[0].step)}
								</UserOrderStatus>
							</UserStatus>
							<OrderDate>
								Time: {giveDateSpan(data[0].date)}
							</OrderDate>
						</MiddleWrapper>
					</JustifyCenterContainer>
					<OrderWrapper>
						<OrderInfo>
							<OrderHeading>User address:</OrderHeading>
							<OrderP>
								Name: {data[0].userInfo.name}
								<br />
								Address: {data[0].userInfo.address}
								<br />
								City: {data[0].userInfo.city}
								<br />
								Zip-Code: {data[0].userInfo.zip}
								<br />
								Phone: {data[0].userInfo.phone}
							</OrderP>
						</OrderInfo>
						<OrderInfo>
							<OrderHeading>Order info:</OrderHeading>
							{data[0].orderInfo.map((el, i) => (
								<OrderP key={i}>
									{el.quantity}x {el.name}
								</OrderP>
							))}
						</OrderInfo>
						<OrderInfo>
							<OrderHeading>Payment</OrderHeading>
							<OrderP>
								{data[0].payment === 1 ? (
									<>
										<CreditCardIcon /> Card
									</>
								) : (
									<>
										<CashIcon /> Cash
									</>
								)}
							</OrderP>
						</OrderInfo>
						<OrderInfo>
							<OrderHeading>Total price</OrderHeading>
							<OrderP medium>${data[0].totalPrice}</OrderP>
						</OrderInfo>
					</OrderWrapper>
					{/* <OrderTotal>Total Price:</OrderTotal> */}
					<MiddleWrapper>
						<OrderHeading>Change status:</OrderHeading>
					</MiddleWrapper>
					<OrderSteps>
						{steps.map((el, i) => (
							<OrderChangeButton
								onClick={() => handleChangeStatus(el.step)}
								key={i}
								step={el.step}
							>
								{el.text}
							</OrderChangeButton>
						))}
					</OrderSteps>
				</>
			)}
		</MainContainer>
	);
};

export default Order;
