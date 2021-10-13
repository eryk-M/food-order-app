import React, { useState, useEffect } from 'react';

import { useLocation, Redirect } from 'react-router-dom';

import { Steps } from 'rsuite';

import { useFirestoreQuery } from 'hooks';

import { getOrder } from 'utils/firebaseGetters';

import {
	TrackerDetailsContainer,
	TrackerDetailsContent,
	TrackerDetailsHeading,
	TrackerDetailsNote,
	TrackerDetailsRefresh,
	TrackerDetailsSummary,
	TrackerDetailsSummaryItem,
	TrackerDetailsSummaryHeading,
	TrackerDetailsSummaryDesc,
	TrackerDetailsSummaryContainer,
	StepsContainer,
} from './TrackerDetailsElements';

export const TrackerDetails = () => {
	const { order } = useLocation();
	const [step, setStep] = useState(null);
	const { data } = useFirestoreQuery(getOrder(order?.orderId));

	useEffect(() => {
		if (data) {
			setStep(data[0].step);
		}

		return () => {
			setStep(null);
		};
	}, [data]);

	if (!order) return <Redirect to="/food-tracker" />;

	const showStatus = (status) => {
		switch (status) {
			case 0:
				return 'Your order has been placed';
			case 1:
				return 'We are preparing your order';
			case 2:
				return 'We are cooking...';
			case 3:
				return 'Your order is on its way to you!';
			case 4:
				return 'Your order has been delivered';
			case 5:
				return 'You order has been cancelled';
			default:
				break;
		}
	};

	const { userInfo, orderInfo } = order;
	return (
		<>
			<TrackerDetailsContainer>
				<TrackerDetailsContent>
					<TrackerDetailsHeading>Order Status:</TrackerDetailsHeading>
					<TrackerDetailsNote>{showStatus(step)}</TrackerDetailsNote>
					<TrackerDetailsRefresh>
						Do not refresh! This page refresh automatically!
					</TrackerDetailsRefresh>
				</TrackerDetailsContent>
				{step !== 5 && (
					<StepsContainer>
						<Steps current={step}>
							<Steps.Item title="Order placed" />
							<Steps.Item title="Preparing" />
							<Steps.Item title="Cooking" />
							<Steps.Item title="Delivery" />
						</Steps>
					</StepsContainer>
				)}
			</TrackerDetailsContainer>

			<TrackerDetailsSummaryContainer>
				<TrackerDetailsSummary>
					<TrackerDetailsSummaryItem>
						<TrackerDetailsSummaryHeading>
							Order Number
						</TrackerDetailsSummaryHeading>
						<TrackerDetailsSummaryDesc>
							{order.orderId}
						</TrackerDetailsSummaryDesc>
					</TrackerDetailsSummaryItem>

					<TrackerDetailsSummaryItem>
						<TrackerDetailsSummaryHeading>
							Delivery Address
						</TrackerDetailsSummaryHeading>
						<TrackerDetailsSummaryDesc>
							{userInfo.name}
							<br />
							{userInfo.address}
							<br />
							{userInfo.city}
							<br />
							{userInfo.zip}
							<br />
							Phone: {userInfo.phone}
						</TrackerDetailsSummaryDesc>
					</TrackerDetailsSummaryItem>

					<TrackerDetailsSummaryItem>
						<TrackerDetailsSummaryHeading>
							Order Details
						</TrackerDetailsSummaryHeading>
						{orderInfo.map((el) => (
							<TrackerDetailsSummaryDesc key={el.id}>
								{el.quantity}x {el.name}
							</TrackerDetailsSummaryDesc>
						))}
						<TrackerDetailsSummaryDesc>
							Total: ${order.totalPrice}
						</TrackerDetailsSummaryDesc>
					</TrackerDetailsSummaryItem>
				</TrackerDetailsSummary>
			</TrackerDetailsSummaryContainer>
		</>
	);
};
