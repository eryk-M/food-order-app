import React from 'react';

import {
	FormElement,
	FormInput,
	FormLabel,
	FormError,
	FormGroup,
} from 'components/Form';
const Discount = ({ isLoading, register, errors }) => {
	return (
		<FormGroup flex justify="space-between">
			<FormElement>
				<FormLabel>Coupon code</FormLabel>
				<FormInput
					{...register('code')}
					error={errors.code}
					disabled={isLoading}
				/>
				{errors.code && <FormError>{errors.code.message}</FormError>}
			</FormElement>
			<FormElement marginleft="2rem">
				<FormLabel>Discount percent</FormLabel>
				<FormInput
					{...register('discount')}
					type="text"
					error={errors.discount}
					disabled={isLoading}
				/>
				{errors.discount && (
					<FormError>{errors.discount.message}</FormError>
				)}
			</FormElement>
			<FormElement marginleft="2rem">
				<FormLabel>From price</FormLabel>
				<FormInput
					{...register('fromPrice')}
					type="text"
					error={errors.fromPrice}
					disabled={isLoading}
				/>
				{errors.fromPrice && (
					<FormError>{errors.fromPrice.message}</FormError>
				)}
			</FormElement>
		</FormGroup>
	);
};

export default Discount;
