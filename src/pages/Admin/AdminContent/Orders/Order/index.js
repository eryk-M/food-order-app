import React, { useState, useRef } from 'react';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getOrder } from 'utils/firebaseGetters';

import {
	MainContainer,
	JustifyCenterContainer,
} from 'components/Admin/Containers';
import { AdminPanelHeading } from 'components/Typography';
import {
	OrderDate,
	OrderWrapper,
	OrderInfo,
	OrderSteps,
	OrderP,
	MiddleWrapper,
	OrderHeading,
	OrderChangeButton,
	UserStatus,
	UserOrderStatus,
	LoaderWrapper,
	PrintButton,
} from './OrderElements';
import Loader from 'components/Loader';

import { Alert } from 'components/Alert';

import {
	CreditCardIcon,
	CashIcon,
	PrinterIcon,
} from 'components/Admin/Icons';

import Status from 'components/Status';

import { useReactToPrint } from 'react-to-print';
import { useApi } from 'contexts/APIContext';

import { FormAlert } from 'components/Form/FormElements';

const ContentToPrint = React.forwardRef(
	(
		{
			returnUserStatus,
			handleChangeStatus,
			giveDateSpan,
			steps,
			loading,
			showSuccess,
			data,
			id,
		},
		ref
	) => {
		return (
			<>
				{data && (
					<>
						{loading && (
							<LoaderWrapper>
								<Loader primary />
							</LoaderWrapper>
						)}
						<div ref={ref} style={{ padding: '1rem' }}>
							<AdminPanelHeading>Order ID: {id}</AdminPanelHeading>
							<JustifyCenterContainer>
								{showSuccess && (
									<Alert success top="9rem" right="2rem">
										Updated
									</Alert>
								)}

								<MiddleWrapper>
									<OrderHeading>Status:</OrderHeading>
									<Status step={data[0].step} />
									<UserStatus>
										Food tracker:{' '}
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
						</div>
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
			</>
		);
	}
);

const Order = (props) => {
	const { data } = useFirestoreQuery(getOrder(props.match.params.id));
	const { updateOrderStatus } = useApi();
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const componentRef = useRef();
	const [error, setError] = useState('');

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const steps = [
		{ step: 1, text: 'Preparing' },
		{ step: 2, text: 'Cooking' },
		{ step: 3, text: 'Delivery' },
		{ step: 4, text: 'Done' },
		{ step: 5, text: 'Cancel' },
	];

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
		try {
			await updateOrderStatus(step, data[0].id);
			setLoading(false);
			setShowSuccess(true);
			showAlert();
		} catch {
			setLoading(false);
			setError('Something went wrong. Please try again!');
		}
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
			{error && <FormAlert variant="danger">{error}</FormAlert>}
			<PrintButton onClick={handlePrint}>
				<PrinterIcon />
				Print
			</PrintButton>
			<ContentToPrint
				ref={componentRef}
				returnUserStatus={returnUserStatus}
				handleChangeStatus={handleChangeStatus}
				giveDateSpan={giveDateSpan}
				steps={steps}
				loading={loading}
				showSuccess={showSuccess}
				data={data}
				id={props.match.params.id}
			/>
		</MainContainer>
	);
};

export default Order;
