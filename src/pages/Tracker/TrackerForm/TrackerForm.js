import React, { useState } from 'react';

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
	FormError,
} from 'components';

import { getOrder } from 'utils/firebaseGetters';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const TrackerForm = () => {
	const { orderId } = useLocation();
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const validationSchema = Yup.object().shape({
		orderId: Yup.string()
			.required('Order ID is required')
			.matches(/[0-9]{10}/, 'Order ID must be in 10 digits format')
			.test('orderId', 'Order ID does not exist', async (value) => {
				if (value.length === 10) {
					const response = await getOrder(value).get();
					return !response.empty;
				}
			}),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await getOrder(data.orderId).get();
			history.push({
				pathname: '/food-tracker/order',
				order: response.docs[0].data(),
			});
		} catch {
			setLoading(false);
			console.error('Something went wrong, please try again');
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
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormElement>
						<FormLabel>Order ID</FormLabel>
						<FormInput
							type="text"
							placeholder="Enter 10 digits Order ID"
							defaultValue={orderId ?? ''}
							{...register('orderId')}
							error={errors.orderId}
						/>
						{errors.orderId && (
							<FormError>{errors.orderId.message}</FormError>
						)}
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
