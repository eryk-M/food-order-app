import React, { useState, useRef, useEffect } from 'react';

import { useFirestoreQuery, useWindowSize } from 'hooks';
import { getOrder } from 'utils/firebaseGetters';
import { Redirect } from 'react-router';
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
	PrintButton,
	OrderContainer,
} from './OrderElements';
import {
	AdminPanelHeading,
	Loader,
	Status,
	CreditCardIcon,
	CashIcon,
	PrinterIcon,
	FormAlert,
	MainContainer,
	JustifyCenterContainer,
	Alert,
} from 'components';

import { useReactToPrint } from 'react-to-print';
import { useApi } from 'contexts';

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
		const size = useWindowSize();

		const { width } = size;
		return (
			<>
				{data && (
					<>
						<OrderContainer ref={ref}>
							<AdminPanelHeading>Order ID: {id}</AdminPanelHeading>
							<JustifyCenterContainer>
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
						</OrderContainer>
						<MiddleWrapper>
							<OrderHeading>Change status:</OrderHeading>
						</MiddleWrapper>

						<OrderSteps>
							{showSuccess && (
								<Alert success top="-6rem" right="0rem">
									{width <= 340 ? '' : 'Updated'}
								</Alert>
							)}

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
	const { data, loading } = useFirestoreQuery(
		getOrder(props.match.params.id)
	);
	const { updateOrderStatus } = useApi();
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [error, setError] = useState('');

	const componentRef = useRef();
	const timeoutRef = useRef();

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, [data]);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	if (data === null) return <Redirect to="/admin/orders/" />;

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
		clearTimeout(timeoutRef.current);
		setIsLoading(true);
		try {
			await updateOrderStatus(step, data[0].id);
			setIsLoading(false);
			setShowSuccess(true);

			const timeout = setTimeout(() => {
				setShowSuccess(false);
			}, 4000);
			timeoutRef.current = timeout;
		} catch (err) {
			setIsLoading(false);
			setError('Something went wrong. Please try again!');
		}
	};

	// const clearAlert = () => clearTimeout(showAlert);

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
		<MainContainer>
			{loading && <Loader primary veryhigh margincenter />}
			{error && <FormAlert variant="danger">{error}</FormAlert>}
			<PrintButton onClick={handlePrint}>
				<PrinterIcon />
				<span>Print</span>
			</PrintButton>
			<ContentToPrint
				ref={componentRef}
				returnUserStatus={returnUserStatus}
				handleChangeStatus={handleChangeStatus}
				giveDateSpan={giveDateSpan}
				steps={steps}
				loading={isLoading}
				showSuccess={showSuccess}
				data={data}
				id={props.match.params.id}
			/>
		</MainContainer>
	);
};

export default Order;
