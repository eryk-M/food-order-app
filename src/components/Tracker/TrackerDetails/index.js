import React, { useState, useEffect } from 'react';

import { useLocation, useHistory, Redirect } from 'react-router-dom';

import { Steps } from 'rsuite';

import { useFirestoreQuery } from '../../../hooks/useFirestoreQuery';
import { useWindowSize } from '../../../hooks/useWindowSize';
import '../../Cart/steps.css';

import { db } from '../../../firebase';

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

const TrackerDetails = () => {
	const { order } = useLocation();
	const size = useWindowSize();
	const [step, setStep] = useState();
	const { data } = useFirestoreQuery(
		order
			? db.collection('orders').where('orderId', '==', order.orderId)
			: null
	);

	useEffect(() => {
		if (data) {
			setStep(data[0].step);
		}

		return () => {
			setStep();
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
				<StepsContainer>
					<Steps
						current={step}
						vertical={size.width < 610 ? true : false}
					>
						<Steps.Item title="Order placed" />
						<Steps.Item title="Preparing" />
						<Steps.Item title="Cooking" />
						<Steps.Item title="Delivery" />
					</Steps>
				</StepsContainer>
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

export default TrackerDetails;
