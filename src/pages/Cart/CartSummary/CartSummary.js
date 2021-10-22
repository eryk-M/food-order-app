import React, { useContext, useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { CartContext, useAuth, useApi } from 'contexts';

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

import { FormButton, Button } from 'components';
import { useHistory } from 'react-router-dom';

export const CartSummary = ({
	step,
	onChangeStep,
	currentUserId,
	discount,
	priceBeforeDiscount,
	quizCode,
	setDiscountAdded,
	setQuizCode,
	setDiscount,
}) => {
	const {
		state: { cart, address, totalPrice, payment },
		dispatch,
	} = useContext(CartContext);

	const [loading, setLoading] = useState(false);
	const [locationKeys, setLocationKeys] = useState([]);

	const { addOrder, setCouponAsUsed } = useApi();
	const { currentUser } = useAuth();
	const history = useHistory();
	useEffect(() => {
		return history.listen((location) => {
			if (history.action === 'POP') {
				if (locationKeys[1] === location.key) {
					setLocationKeys(([_, ...keys]) => keys);
				} else {
					setLocationKeys((keys) => [location.key, ...keys]);
					const response = window.confirm(
						'Are you sure you want to go back? You will be redirected to first step!'
					);

					if (response) {
						history.push('/cart');
					} else {
						history.push('/cart/summary');
					}
				}
			}
		});
	}, [history, locationKeys, onChangeStep]);

	if (step === 0) return <Redirect to="/cart" />;

	const pushOrder = async (e) => {
		setLoading(true);
		let importantInfo = [];
		let orderId = '';
		for (let i = 0; i < 10; i++) {
			let rndInt = Math.floor(Math.random() * 9) + 1;
			orderId += rndInt;
		}

		try {
			cart.forEach((el) => {
				importantInfo.push({
					name: el.name,
					id: el.id,
					price: el.price,
					quantity: el.quantity,
				});
			});
			const date = Date.now();
			await addOrder(
				address,
				importantInfo,
				Number(totalPrice),
				orderId,
				currentUserId ?? '',
				date,
				payment
			);
			if (quizCode) {
				await setCouponAsUsed(currentUser.uid, quizCode);
			}

			setLoading(false);
			localStorage.removeItem('cart');
			setDiscountAdded(false);
			setQuizCode('');
			setDiscount(null);
			dispatch({
				type: 'RESET_CART',
			});
			onChangeStep(e, 'push', orderId);
		} catch (error) {
			console.error(error);
			alert('Something went wrong! Please try again!');
			setLoading(false);
			if (window.confirm) {
				history.push('/cart');
			}
		}
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
								Total:{' '}
								<span>
									$
									{el.discountPrice !== 0
										? (el.discountPrice * el.quantity).toFixed(2)
										: (el.price * el.quantity).toFixed(2)}
								</span>
							</CartSummaryOrderInfo>
						</CartSummaryOrder>
					</CartSummaryItem>
				))}
				<CartSummaryButtonWrapper>
					<Button onClick={(e) => onChangeStep(e, 'back')}>
						Back to address
					</Button>
					<FormButton
						button
						disabled={loading}
						text="Order now!"
						onClick={(e) => pushOrder(e)}
						secondary
						orderButton
						loading={loading}
					/>
				</CartSummaryButtonWrapper>
			</CartSummaryDetails>
			<CartSummaryTotal>
				<CartSummaryTotalHeading>
					Order details
				</CartSummaryTotalHeading>
				<CartSummaryTotalItem>
					<span>Price:</span>{' '}
					<span>${priceBeforeDiscount.toFixed(2)}</span>
				</CartSummaryTotalItem>
				<CartSummaryTotalItem>
					<span>Discount:</span>{' '}
					<span>{discount ? `${discount}%` : 'None'}</span>
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
