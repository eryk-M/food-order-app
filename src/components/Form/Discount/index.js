import React from 'react';

import {
	FormElement,
	FormInput,
	FormLabel,
	FormError,
	FormGroup,
} from 'components/Form/FormElements';
const Discount = ({ isLoading, register, errors }) => {
	const preventKeys = (e) => {
		if (
			(e.which !== 8 && e.which !== 0 && e.which < 48) ||
			e.which > 57
		) {
			e.preventDefault();
		}
	};
	return (
		<FormGroup flex>
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
					type="number"
					error={errors.discount}
					disabled={isLoading}
					onKeyDown={(e) => preventKeys(e)}
				/>
				{errors.discount && (
					<FormError>{errors.discount.message}</FormError>
				)}
			</FormElement>
			<FormElement marginleft="2rem">
				<FormLabel>From price</FormLabel>
				<FormInput
					{...register('fromPrice')}
					type="number"
					error={errors.fromPrice}
					disabled={isLoading}
					onKeyDown={(e) => preventKeys(e)}
				/>
				{errors.fromPrice && (
					<FormError>{errors.fromPrice.message}</FormError>
				)}
			</FormElement>
		</FormGroup>
	);
};

export default Discount;
