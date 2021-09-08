import React, {
	useState,
	useContext,
	useEffect,
	useRef,
} from 'react';

import { Switch, Route, useHistory } from 'react-router-dom';

import { Steps } from 'rsuite';

import './steps.css';

import { CartWrapper, CartContainer } from './CartElements';

import CartOrder from './CartOrder';
import CartAddress from './CartAddress';
import CartSummary from './CartSummary';

import { CartContext } from '../../contexts/CartContext';

import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/APIContext';
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

	useEffect(() => {
		if (!userData && currentUser) {
			getUserInfo(currentUser.uid).then((data) => {
				setUserData(data);
			});
		}
	}, [currentUser, getUserInfo, userData]);

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
		} else if (step === 2) {
			history.push('/cart/summary');
		}
	}, [cart, dispatch, step, history]);

	const onChangeStep = (e, where) => {
		e.preventDefault();
		if (where === 'back') return setStep(step - 1);
		setStep(step + 1);
	};

	return (
		<CartWrapper>
			<Steps current={step}>
				<Steps.Item title="Details" />
				<Steps.Item title="Address" />
				<Steps.Item title="Summary" />
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
						render={() => (
							<CartAddress
								step={step}
								userData={userData}
								onChangeStep={onChangeStep}
							/>
						)}
					/>
					<Route
						path="/cart/summary"
						exact
						render={() => (
							<CartSummary step={step} onChangeStep={onChangeStep} />
						)}
					/>
				</Switch>
			</CartContainer>
		</CartWrapper>
	);
};

export default Cart;
