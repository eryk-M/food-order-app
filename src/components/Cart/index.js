import React, {
	useState,
	useContext,
	useEffect,
	useCallback,
	useRef,
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

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserDoc } from 'utils/firebaseGetters';

const Cart = () => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const { currentUser } = useAuth();
	const [step, setStep] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [payment, setPayment] = useState(null);
	const [discount, setDiscount] = useState(null);
	const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
	const [discountCalcFlag, setDiscountCalcFlag] = useState(false);
	const [discountAdded, setDiscountAdded] = useState(false);
	const [quizCode, setQuizCode] = useState('');

	const history = useHistory();
	const scrollRef = useRef();
	const { data } = useFirestoreQuery(
		currentUser ? getUserDoc(currentUser.uid) : null
	);

	const setDispatchTotalPrice = () => {
		dispatch({
			type: 'SET_TOTAL_PRICE',
			payload: totalPrice.toFixed(2),
		});
	};

	const getTotalPrice = useCallback(() => {
		let cartWithDiscount = 0;
		let cartBeforeDiscount = 0;
		cart.map((el) => {
			if (el.discountPrice !== 0) {
				return (cartBeforeDiscount += el.discountPrice * el.quantity);
			} else {
				return (cartBeforeDiscount += el.price * el.quantity);
			}
		});
		if (discount) {
			cartWithDiscount =
				cartBeforeDiscount - cartBeforeDiscount * (discount / 100);
		}
		setTotalPrice(
			cartWithDiscount !== 0 ? cartWithDiscount : cartBeforeDiscount
		);
		setPriceBeforeDiscount(cartBeforeDiscount);
		setDiscountCalcFlag(true);
	}, [cart, discount]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
		getTotalPrice();
	}, [cart, getTotalPrice]);

	const onChangeStep = useCallback(
		(e, where, orderId) => {
			const { pathname } = history.location;
			if (e !== undefined) e.preventDefault();

			if (where === 'back') {
				setStep((prevStep) => prevStep - 1);
				if (pathname === '/cart/address') {
					history.push('/cart');
				} else if (pathname === '/cart/summary') {
					history.push('/cart/address');
				}
			} else if (where === 'begin') {
				setStep(0);
			} else if (where === 'push') {
				setStep((prevStep) => prevStep + 1);
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
		},
		[history]
	);

	// scrollRef.current?.scrollIntoView();
	return (
		<CartWrapper ref={scrollRef}>
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
								payment={payment}
								setPayment={setPayment}
								setDiscount={setDiscount}
								discount={discount}
								setTotalPrice={setTotalPrice}
								setDiscountCalcFlag={setDiscountCalcFlag}
								discountCalcFlag={discountCalcFlag}
								discountAdded={discountAdded}
								setDiscountAdded={setDiscountAdded}
								setQuizCode={setQuizCode}
							/>
						)}
					/>
					<Route
						path="/cart/address"
						exact
						render={() => (
							<CartAddress
								step={step}
								userData={data}
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
								discount={discount}
								priceBeforeDiscount={priceBeforeDiscount}
								quizCode={quizCode}
								setDiscountAdded={setDiscountAdded}
								setQuizCode={setQuizCode}
								setDiscount={setDiscount}
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
