import React, { useContext, useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { CartContext } from 'contexts/CartContext';

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

import Button from 'components/Button';
import { FormButton } from 'components/Form/FormElements';
import { useApi } from 'contexts/APIContext';

import { useHistory } from 'react-router-dom';

const CartSummary = ({ step, onChangeStep, currentUserId }) => {
	const {
		state: { cart, address, totalPrice },
		dispatch,
	} = useContext(CartContext);

	const [importantInfo, setImportantInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const { addOrder } = useApi();
	const history = useHistory();

	useEffect(() => {
		if (importantInfo.length === 0) {
			cart.forEach((el) => {
				importantInfo.push({
					name: el.name,
					id: el.id,
					price: el.price,
					quantity: el.quantity,
				});
			});
		}

		return () => {
			setImportantInfo([]);
		};
	}, [cart, importantInfo]);

	if (step === 0) return <Redirect to="/cart" />;

	const pushOrder = (e) => {
		setLoading(true);
		let orderId = '';
		for (let i = 0; i < 10; i++) {
			let rndInt = Math.floor(Math.random() * 9) + 1;
			orderId += rndInt;
		}

		addOrder(
			address,
			importantInfo,
			Number(totalPrice),
			orderId,
			currentUserId ?? ''
		)
			.then(() => {
				setLoading(false);
				dispatch({
					type: 'RESET_CART',
				});
				localStorage.removeItem('cart');
				onChangeStep(e, 'push', orderId);
			})
			.catch(() => {
				alert('Something went wrong! Please try again!');
				setLoading(false);
				if (window.confirm) {
					history.push('/cart');
				}
			});
	};

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
					<FormButton
						button
						loading={loading}
						disabled={loading}
						text="Accept and pay!"
						onClick={(e) => pushOrder(e)}
					/>
				</CartSummaryButtonWrapper>
			</CartSummaryDetails>
			<CartSummaryTotal>
				<CartSummaryTotalHeading>
					Order details
				</CartSummaryTotalHeading>
				{/* TODO: DO ZROBIENIA CENA PRZED OBNIZKA*/}
				<CartSummaryTotalItem>
					<span>Price:</span> <span>$49.00</span>
				</CartSummaryTotalItem>
				{/* TODO: DO ZROBIENIA CENA PO OBNIZCE*/}
				<CartSummaryTotalItem>
					<span>Discount:</span> <span>- ???</span>
				</CartSummaryTotalItem>
				<CartSummaryTotalItem>
					<span>Delivery:</span>{' '}
					<span style={{ color: 'var(--color-green)' }}>Free</span>
				</CartSummaryTotalItem>
				<CartSummaryTotalItem total>
					<span>Total amount:</span> <span>${totalPrice}</span>
				</CartSummaryTotalItem>
			</CartSummaryTotal>
		</CartSummaryContainer>
	);
};

export default CartSummary;
