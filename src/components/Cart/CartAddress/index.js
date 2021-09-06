import React from 'react';

import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
} from '../../Form/FormElements';

import {
	CartAddressContainer,
	CartAddressSteps,
	CartAddressHeading,
	CartAddressIcon,
} from './CartAddressElements';

import Button from '../../Button/index';
const CartAddress = ({ onChangeStep }) => {
	return (
		<div>
			<CartAddressHeading>
				Add shipping address
				<CartAddressIcon marginleft="4rem" />
			</CartAddressHeading>
			<CartAddressContainer>
				<Form>
					<FormElement>
						<FormLabel htmlFor="name">First name *</FormLabel>
						<FormInput name="name" type="text" required />
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="number">Phone number *</FormLabel>
						<FormInput name="number" type="number" required />
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="address">Address *</FormLabel>
						<FormInput name="address" type="text" required />
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="city">City *</FormLabel>
						<FormInput name="city" type="text" required />
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="zipcode">Zip/Postal Code *</FormLabel>
						<FormInput name="zipcode" type="number" required />
					</FormElement>
					<CartAddressSteps>
						<Button type="text" onClick={() => onChangeStep('back')}>
							&#8592; Back to order{' '}
						</Button>
						<Button type="submit" marginleft="auto">
							Proceed to summary &#10141;
						</Button>
					</CartAddressSteps>
				</Form>
			</CartAddressContainer>
		</div>
	);
};

export default CartAddress;
