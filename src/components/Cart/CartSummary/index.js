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
import { useAuth } from 'contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const CartSummary = ({
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

	const [importantInfo, setImportantInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const { addOrder, setCouponAsUsed } = useApi();
	const { currentUser } = useAuth();
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

	const pushOrder = async (e) => {
		setLoading(true);
		let orderId = '';
		for (let i = 0; i < 10; i++) {
			let rndInt = Math.floor(Math.random() * 9) + 1;
			orderId += rndInt;
		}
		try {
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
			setDiscountAdded(false);
			setQuizCode('');
			setLoading(false);
			setDiscount(null);
			dispatch({
				type: 'RESET_CART',
			});
			localStorage.removeItem('cart');
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
										? el.discountPrice.toFixed(2) * el.quantity
										: el.price.toFixed(2) * el.quantity}
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
						loading={loading}
						disabled={loading}
						text="Order now!"
						onClick={(e) => pushOrder(e)}
						secondary
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

export default CartSummary;
