import React from 'react';
import { Redirect } from 'react-router';
import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormError,
	Button,
} from 'components';

import {
	CartAddressContainer,
	CartAddressSteps,
	CartAddressHeading,
	CartAddressIcon,
} from './CartAddressElements';

import { useForm } from 'react-hook-form';

//FORM
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWindowSize } from 'hooks';

export const CartAddress = ({
	onChangeStep,
	userData,
	step,
	dispatch,
}) => {
	const { width } = useWindowSize();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	if (step === 0) return <Redirect to="/cart" />;

	const onSubmit = (data) => {
		dispatch({
			type: 'SET_ADDRESS',
			payload: {
				name: data.name,
				phone: data.phone,
				address: data.address,
				city: data.city,
				zip: data.zipcode,
			},
		});
		onChangeStep(undefined, 'push');
	};

	return (
		<>
			<CartAddressHeading>
				Add shipping address
				<CartAddressIcon marginleft="4rem" />
			</CartAddressHeading>
			<CartAddressContainer>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormElement>
						<FormLabel htmlFor="name">Name *</FormLabel>
						<FormInput
							{...register('name')}
							type="text"
							defaultValue={userData?.name}
							error={errors.name}
						/>
						{errors.name && (
							<FormError>{errors.name.message}</FormError>
						)}
					</FormElement>

					<FormElement>
						<FormLabel>Phone number *</FormLabel>
						<FormInput
							{...register('phone')}
							type="number"
							defaultValue={userData?.phone}
							error={errors.phone}
						/>
						{errors.phone && (
							<FormError>{errors.phone.message}</FormError>
						)}
					</FormElement>

					<FormElement>
						<FormLabel>Address *</FormLabel>
						<FormInput
							{...register('address')}
							type="text"
							defaultValue={userData?.address}
							error={errors.address}
						/>
						{errors.address && (
							<FormError>{errors.address.message}</FormError>
						)}
					</FormElement>

					<FormElement>
						<FormLabel>City *</FormLabel>
						<FormInput
							{...register('city')}
							type="text"
							defaultValue={userData?.city}
							error={errors.city}
						/>
						{errors.city && (
							<FormError>{errors.city.message}</FormError>
						)}
					</FormElement>

					<FormElement>
						<FormLabel>Zip/Postal Code *</FormLabel>
						<FormInput
							{...register('zipcode')}
							type="text"
							defaultValue={userData?.zip}
							placeholder="e.g. 10-100 or 10100"
							error={errors.zipcode}
						/>
						{errors.zipcode && (
							<FormError>{errors.zipcode.message}</FormError>
						)}
					</FormElement>
					<CartAddressSteps>
						<Button
							type="button"
							onClick={(e) => onChangeStep(e, 'back')}
						>
							{width <= 360 ? 'Cart' : 'Back to cart'}
						</Button>
						<Button marginleft="auto" type="submit">
							{width <= 360
								? 'Summary \u279D'
								: 'Proceed to summary \u279D'}
						</Button>
					</CartAddressSteps>
				</Form>
			</CartAddressContainer>
		</>
	);
};
