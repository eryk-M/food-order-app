import React from 'react';
import { Redirect } from 'react-router';
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

const CartAddress = ({
	nameRef,
	phoneRef,
	addressRef,
	cityRef,
	zipRef,
	onChangeStep,
	userData,
	step,
	setAddressInfo,
}) => {
	if (step === 0) return <Redirect to="/cart" />;

	return (
		<>
			<CartAddressHeading>
				Add shipping address
				<CartAddressIcon marginleft="4rem" />
			</CartAddressHeading>
			<CartAddressContainer>
				<Form
					onSubmit={(e) => {
						setAddressInfo(e);
						onChangeStep(e, 'push');
					}}
				>
					<FormElement>
						<FormLabel htmlFor="name">Name *</FormLabel>
						<FormInput
							ref={nameRef}
							name="name"
							type="text"
							defaultValue={userData ? userData.name : ''}
							required
						/>
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="number">Phone number *</FormLabel>
						<FormInput
							ref={phoneRef}
							name="number"
							type="number"
							defaultValue={userData ? userData.phone : ''}
							required
						/>
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="address">Address *</FormLabel>
						<FormInput
							ref={addressRef}
							name="address"
							type="text"
							defaultValue={userData ? userData.address : ''}
							required
						/>
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="city">City *</FormLabel>
						<FormInput
							ref={cityRef}
							name="city"
							type="text"
							defaultValue={userData ? userData.city : ''}
							required
						/>
					</FormElement>

					<FormElement>
						<FormLabel htmlFor="zipcode">Zip/Postal Code *</FormLabel>
						<FormInput
							ref={zipRef}
							name="zipcode"
							type="text"
							defaultValue={userData ? userData.zip : ''}
							required
							inputmode="numeric"
							pattern="[0-9]{2}[-][0-9]{3}"
							placeholder="e.g. 10-100 or 10100"
						/>
					</FormElement>
					<CartAddressSteps>
						<Button
							type="text"
							onClick={(e) => onChangeStep(e, 'back')}
						>
							&#8592; Back to order{' '}
						</Button>
						<Button type="submit" marginleft="auto">
							Proceed to summary &#10141;
						</Button>
					</CartAddressSteps>
				</Form>
			</CartAddressContainer>
		</>
	);
};

export default CartAddress;
