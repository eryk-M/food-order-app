import React, {
	useState,
	useContext,
	useEffect,
	useCallback,
} from 'react';

import { Switch, Route, useHistory } from 'react-router-dom';

import { Steps } from 'rsuite';

import './steps.css';

import { CartWrapper, CartContainer } from './CartElements';

import CartOrder from './CartOrder';
import CartAddress from './CartAddress';
import CartSummary from './CartSummary';
import CartComplete from './CartComplete';

import { CartContext } from 'contexts/CartContext';
import { useAuth } from 'contexts/AuthContext';
import { useApi } from 'contexts/APIContext';

const Cart = () => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const { currentUser } = useAuth();
	const { getUserInfo } = useApi();

	const [step, setStep] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [userData, setUserData] = useState();
	const history = useHistory();

	const setDispatchTotalPrice = () => {
		dispatch({
			type: 'SET_TOTAL_PRICE',
			payload: totalPrice.toFixed(2),
		});
	};
	const getTotalPrice = useCallback(() => {
		const totalCartPrice = cart.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		setTotalPrice(totalCartPrice);
	}, [cart]);

	useEffect(() => {
		if (!userData && currentUser) {
			getUserInfo(currentUser.uid).then((data) => {
				setUserData(data);
			});
		}
	}, [currentUser, getUserInfo, userData]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
		getTotalPrice();
	}, [cart, getTotalPrice]);

	const onChangeStep = (e, where, orderId) => {
		const { pathname } = history.location;
		if (e !== undefined) e.preventDefault();

		if (where === 'back') {
			setStep(step - 1);
			if (pathname === '/cart/address') {
				history.push('/cart');
			} else if (pathname === '/cart/summary') {
				history.push('/cart/address');
			}
		} else if (where === 'begin') {
			setStep(0);
		} else if (where === 'push') {
			setStep(step + 1);
			if (pathname === '/cart') {
				history.push('/cart/address');
			} else if (pathname === '/cart/address') {
				history.push('/cart/summary');
			} else if (pathname === '/cart/summary') {
				history.push({
					pathname: '/cart/complete',
					order: orderId,
				});
			}
		}
	};

	return (
		<CartWrapper>
			<Steps current={step}>
				<Steps.Item title="Details" />
				<Steps.Item title="Address" />
				<Steps.Item title="Summary" />
				<Steps.Item title="Complete" />
			</Steps>
			<CartContainer>
				<Switch>
					<Route
						path="/cart"
						exact
						render={() => (
							<CartOrder
								setDispatchTotalPrice={setDispatchTotalPrice}
								step={step}
								onChangeStep={onChangeStep}
								totalPrice={totalPrice}
							/>
						)}
					/>
					<Route
						path="/cart/address"
						exact
						render={() => (
							<CartAddress
								step={step}
								userData={userData}
								dispatch={dispatch}
								onChangeStep={onChangeStep}
							/>
						)}
					/>
					<Route
						path="/cart/summary"
						exact
						render={() => (
							<CartSummary
								currentUserId={currentUser?.uid}
								step={step}
								onChangeStep={onChangeStep}
							/>
						)}
					/>
					<Route
						path="/cart/complete"
						exact
						render={() => <CartComplete step={step} />}
					/>
				</Switch>
			</CartContainer>
		</CartWrapper>
	);
};

export default Cart;
