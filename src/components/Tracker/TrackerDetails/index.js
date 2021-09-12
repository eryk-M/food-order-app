import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { Steps } from 'rsuite';
import '../../Cart/steps.css';
import {
	TrackerDetailsContainer,
	TrackerDetailsContent,
	TrackerDetailsHeading,
	TrackerDetailsNote,
} from './TrackerDetailsElements';

const TrackerDetails = () => {
	const { order } = useLocation();

	const [step, setStep] = useState(0);

	console.log(order);
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setStep(step + 1);
	// 	}, 5000);
	// 	return () => clearInterval(interval);
	// }, [step]);

	return (
		<TrackerDetailsContainer>
			<TrackerDetailsContent>
				<TrackerDetailsHeading>Order Status:</TrackerDetailsHeading>
				<TrackerDetailsNote>
					Your order has been placed
				</TrackerDetailsNote>
			</TrackerDetailsContent>
			<Steps current={step}>
				<Steps.Item title="Order placed" />
				<Steps.Item title="Preparing" />
				<Steps.Item title="Cooking" />
				<Steps.Item title="Delivery" />
			</Steps>
		</TrackerDetailsContainer>
	);
};

export default TrackerDetails;
