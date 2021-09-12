import React, { useState, useRef } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import {
	TrackerFormHeading,
	TrackerFormNote,
	TrackerFormContainer,
	TrackerFormWrapper,
} from './TrackerFormElements';

import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
} from '../../Form/FormElements';

import { useApi } from '../../../contexts/APIContext';

const TrackerForm = () => {
	const { orderId } = useLocation();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { getOrder } = useApi();

	const orderRef = useRef();

	const findOrder = (e) => {
		e.preventDefault();
		setLoading(true);
		if (!isNaN(orderRef.current.value)) {
			getOrder(orderRef.current.value).then((order) => {
				if (!order) {
					setError('There is no order with this ID!');
					setLoading(false);
				} else {
					orderRef.current.value = '';
					setLoading(false);
					history.push({
						pathname: '/food-tracker/order',
						order: order,
					});
				}
			});
		} else {
			setError('Only digits are accepted!');
			setLoading(false);
		}
	};

	return (
		<TrackerFormContainer>
			<TrackerFormHeading>Track Order</TrackerFormHeading>
			<TrackerFormNote>
				To track your order please enter your{' '}
				<strong>10 digits Order ID</strong> in the box below and press
				the "Track" button. This was given to you on your receipt
				after you completed order. <br />
				<br /> If you have an account, you can find your Order ID in
				User profile &#8594; My orders
			</TrackerFormNote>
			<TrackerFormWrapper>
				<Form onSubmit={(e) => findOrder(e)}>
					<FormElement>
						<FormLabel>Order ID</FormLabel>
						<FormInput
							ref={orderRef}
							type="tel"
							placeholder="Enter 10 digits Order ID"
							pattern="[0-9]{10}"
							defaultValue={orderId ?? ''}
							maxLength="10"
							required
						/>
						{error && <p>{error}</p>}
						<FormButton
							loading={loading}
							type="submit"
							text="Track"
						/>
					</FormElement>
				</Form>
			</TrackerFormWrapper>
		</TrackerFormContainer>
	);
};

export default TrackerForm;
