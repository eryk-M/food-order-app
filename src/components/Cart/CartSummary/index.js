import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import { CartContext } from '../../../contexts/CartContext';

import {
	CartSummaryContainer,
	CartSummaryDetails,
	CartSummaryDetailsHeading,
	CartSummaryItem,
	CartSummaryAddressInfo,
	CartSummaryOrderImage,
	CartSummaryOrder,
	CartSummaryOrderInfo,
	CartSummaryButtonWrapper,
	CartSummaryTotal,
	CartSummaryTotalHeading,
	CartSummaryTotalItem,
	CartSummaryAddressIcon,
	CartSummaryCartIcon,
	CartSummaryIconWrapper,
} from './CartSummaryElements';

import Button from '../../Button';

//, phone, address, city, zip,
const CartSummary = ({ step, onChangeStep }) => {
	const {
		state: { cart, address, totalPrice },
	} = useContext(CartContext);

	if (step === 0) return <Redirect to="/cart" />;

	console.log(cart, address, totalPrice);
	return (
		<CartSummaryContainer>
			<CartSummaryDetails>
				<CartSummaryDetailsHeading>
					<CartSummaryIconWrapper>
						<CartSummaryAddressIcon />
					</CartSummaryIconWrapper>
					Delivery address
				</CartSummaryDetailsHeading>
				<CartSummaryItem>
					<CartSummaryAddressInfo>
						{address.name}
					</CartSummaryAddressInfo>
					<CartSummaryAddressInfo>
						{address.address}
					</CartSummaryAddressInfo>
					<CartSummaryAddressInfo>
						{address.phone}
					</CartSummaryAddressInfo>
					<CartSummaryAddressInfo>
						{address.city}
					</CartSummaryAddressInfo>
					<CartSummaryAddressInfo>
						{address.zip}
					</CartSummaryAddressInfo>
				</CartSummaryItem>
				<CartSummaryDetailsHeading>
					<CartSummaryIconWrapper>
						<CartSummaryCartIcon />
					</CartSummaryIconWrapper>{' '}
					Order summary
				</CartSummaryDetailsHeading>
				{cart.map((el) => (
					<CartSummaryItem key={el.id} flex>
						<CartSummaryOrderImage src={el.img} />
						<CartSummaryOrder>
							<CartSummaryOrderInfo fontW="bold">
								{el.name}
							</CartSummaryOrderInfo>
							<CartSummaryOrderInfo>
								Quantity: <span>{el.quantity}</span>
							</CartSummaryOrderInfo>
							<CartSummaryOrderInfo>
								Total: <span>${el.quantity * el.price}</span>
							</CartSummaryOrderInfo>
						</CartSummaryOrder>
					</CartSummaryItem>
				))}
				<CartSummaryButtonWrapper>
					<Button onClick={(e) => onChangeStep(e, 'back')}>
						&#8592; Back to address
					</Button>
					<Button>Accept and pay!</Button>
				</CartSummaryButtonWrapper>
			</CartSummaryDetails>
			<CartSummaryTotal>
				<CartSummaryTotalHeading>
					Order details
				</CartSummaryTotalHeading>
				<CartSummaryTotalItem>
					<span>Price:</span> <span>$49.00</span>
				</CartSummaryTotalItem>
				<CartSummaryTotalItem>
					<span>Discount:</span> <span>-10%</span>
				</CartSummaryTotalItem>
				<CartSummaryTotalItem>
					<span>Delivery:</span>{' '}
					<span style={{ color: 'var(--color-green)' }}>Free</span>
				</CartSummaryTotalItem>
				<CartSummaryTotalItem total>
					<span>Total amount:</span> <span>$39.00</span>
				</CartSummaryTotalItem>
			</CartSummaryTotal>
		</CartSummaryContainer>
	);
};

export default CartSummary;
