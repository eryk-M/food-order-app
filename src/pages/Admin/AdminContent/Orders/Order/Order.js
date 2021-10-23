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
	AlertAdmin,
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
		const { width } = useWindowSize();
		const [{ step, date, userInfo, orderInfo, payment, totalPrice }] =
			data || [{}];
		const { name, address, city, zip, phone } = userInfo || {};
		return (
			<>
				{data && (
					<>
						<OrderContainer ref={ref}>
							<AdminPanelHeading>Order ID: {id}</AdminPanelHeading>
							<JustifyCenterContainer>
								<MiddleWrapper>
									<OrderHeading>Status:</OrderHeading>
									<Status step={step} />
									<UserStatus>
										Food tracker:{' '}
										<UserOrderStatus step={step}>
											{returnUserStatus(step)}
										</UserOrderStatus>
									</UserStatus>
									<OrderDate>Time: {giveDateSpan(date)}</OrderDate>
								</MiddleWrapper>
							</JustifyCenterContainer>
							<OrderWrapper>
								<OrderInfo>
									<OrderHeading>User address:</OrderHeading>
									<OrderP>
										Name: {name}
										<br />
										Address: {address}
										<br />
										City: {city}
										<br />
										Zip-Code: {zip}
										<br />
										Phone: {phone}
									</OrderP>
								</OrderInfo>
								<OrderInfo>
									<OrderHeading>Order info:</OrderHeading>
									{orderInfo.map((el, i) => (
										<OrderP key={i}>
											{el.quantity}x {el.name}
										</OrderP>
									))}
								</OrderInfo>
								<OrderInfo>
									<OrderHeading>Payment</OrderHeading>
									<OrderP>
										{payment === 1 ? (
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
									<OrderP medium>${totalPrice}</OrderP>
								</OrderInfo>
							</OrderWrapper>
						</OrderContainer>
						<MiddleWrapper>
							<OrderHeading>Change status:</OrderHeading>
						</MiddleWrapper>

						<OrderSteps>
							<AlertAdmin
								top="-7rem"
								right="0"
								showSuccess={showSuccess}
							>
								{width <= 340 ? '' : 'Updated'}
							</AlertAdmin>

							{steps.map((el, i) => (
								<OrderChangeButton
									onClick={() => handleChangeStatus(el.step)}
									key={i}
									step={el.step}
									disabled={showSuccess}
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

	if (data?.length === 0) return <Redirect to="/admin/orders" />;

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
			}, 3000);
			timeoutRef.current = timeout;
		} catch (err) {
			setIsLoading(false);
			setError('Something went wrong. Please try again!');
		}
	};

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
