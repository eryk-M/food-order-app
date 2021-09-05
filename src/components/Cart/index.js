import React, { useState, useContext, useEffect } from 'react';

import { Switch, Route, useHistory } from 'react-router-dom';

import { Steps } from 'rsuite';

import './steps.css';

import { CartWrapper, CartContainer } from './CartElements';

import CartOrder from './CartOrder/index';
import CartAddress from './CartAddress/index';
import { CartContext } from '../../contexts/CartContext';

const Cart = () => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const [step, setStep] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const history = useHistory();

	useEffect(() => {
		const getTotalPrice = () => {
			const totalCartPrice = cart.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);
			setTotalPrice(totalCartPrice);
		};
		localStorage.setItem('cart', JSON.stringify(cart));
		getTotalPrice();

		if (step === 0) {
			history.push('/cart');
		} else if (step === 1) {
			history.push('/cart/address');
		}
	}, [cart, dispatch, step, history]);

	const onChangeStep = (where) => {
		if (where === 'back') return setStep(step - 1);
		setStep(step + 1);
	};

	return (
		<CartWrapper>
			<Steps current={step}>
				<Steps.Item title="Order details" />
				<Steps.Item title="Address" />
				<Steps.Item title="Checkout summary" />
				<Steps.Item title="Finish" />
			</Steps>
			<CartContainer>
				<Switch>
					<Route
						path="/cart"
						exact
						render={() => (
							<CartOrder
								step={step}
								onChangeStep={onChangeStep}
								totalPrice={totalPrice}
							/>
						)}
					/>
					<Route
						path="/cart/address"
						exact
						render={() => <CartAddress onChangeStep={onChangeStep} />}
					/>
				</Switch>
			</CartContainer>
		</CartWrapper>
	);
};

export default Cart;
