import React, { useContext, useEffect, useState } from 'react';

import {
	CartList,
	CartItem,
	CartColumn,
	CartImage,
	CartDelete,
	CartCouponForm,
	CartQuantity,
	CartTotal,
	CartLink,
	CartTotalContent,
	CartNoItems,
	CartTable,
	CartPayment,
	CartPaymentP,
	CartPaymentLabel,
	CartPaymentInput,
	CartPaymentWrapper,
	CartPaymentImage,
	CartPaymentIcon,
	CartTotalDiscount,
	CartCouponNote,
	CartQuantityInput,
	CartQuantityWrapper,
} from './CartOrderElements';

import Cash from 'assets/images/cash.webp';
import Card from 'assets/images/card.webp';

import { useApi, useAuth, CartContext } from 'contexts';

import { FormError, FormInput, Alert, Button } from 'components';

//FORM
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

export const CartOrder = ({
	setDispatchTotalPrice,
	step,
	totalPrice,
	onChangeStep,
	payment,
	setPayment,
	setDiscount,
	discount,
	setTotalPrice,
	discountCalcFlag,
	setDiscountCalcFlag,
	discountAdded,
	setDiscountAdded,
	setQuizCode,
}) => {
	const { validateDiscountCode, validateQuizCode } = useApi();
	const { currentUser } = useAuth();

	const [loading, setLoading] = useState(false);

	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(
			validationSchema(
				validateQuizCode,
				validateDiscountCode,
				currentUser
			)
		),
	});

	const findItem = (id) => {
		const item = cart.find((el) => el.id === id);
		return item;
	};

	useEffect(() => {
		if (step !== 0) onChangeStep(undefined, 'begin');
		if (discount && !discountAdded && !discountCalcFlag) {
			const discountPrice =
				totalPrice - totalPrice * (discount / 100);
			setTotalPrice(discountPrice);
			setDiscountAdded(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		discount,
		discountAdded,
		discountCalcFlag,
		setDiscountAdded,
		setTotalPrice,
		step,
		totalPrice,
	]);

	const onDeleteItem = (id) => {
		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: findItem(id),
		});
	};
	const onChangeQuantity = (e, id) => {
		const sign = e.currentTarget.value;
		switch (sign) {
			case '+':
				dispatch({
					type: 'ADD_QUANTITY',
					payload: findItem(id),
				});
				break;
			case '-':
				dispatch({
					type: 'REMOVE_QUANTITY',
					payload: findItem(id),
				});
				break;
			default:
				break;
		}
	};
	const setDispatchMethod = () => {
		dispatch({
			type: 'SET_METHOD',
			payload: payment,
		});
	};

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await validateDiscountCode(data.discount);
			const docs = response.docs[0].data();
			if (docs.fromPrice > totalPrice) {
				setLoading(false);
				return setError('discount', {
					message: `This code is available from $${docs.fromPrice}`,
				});
			}

			if (docs.quiz) {
				setQuizCode(data.discount);
			}

			setDiscount(docs.discount);
			setDiscountAdded(true);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};
	return (
		<>
			<CartTable>
				<CartList>
					{cart.length >= 1 && (
						<CartItem backgroundColor="var(--color-background-grey-light)">
							<CartColumn></CartColumn>
							<CartColumn>Name</CartColumn>
							<CartColumn>Price</CartColumn>
							<CartColumn textalign="center">Quantity</CartColumn>
							<CartColumn display="none" textalign="center">
								Subtotal
							</CartColumn>
							<CartColumn textalign="center">Delete</CartColumn>
						</CartItem>
					)}

					{cart.length === 0 && (
						<CartNoItems>Your cart is empty.</CartNoItems>
					)}

					{cart.map((el) => (
						<CartItem key={el.id}>
							<CartColumn>
								<CartLink to={`/product/${el.id}`}>
									<CartImage effect="opacity" src={el.img} />
								</CartLink>
							</CartColumn>
							<CartColumn>
								<CartLink to={`/product/${el.id}`}>
									{el.name}
								</CartLink>
							</CartColumn>
							<CartColumn>
								$
								{el.discountPrice !== 0
									? el.discountPrice.toFixed(2)
									: el.price.toFixed(2)}
							</CartColumn>
							<CartColumn textalign="center" center>
								<CartQuantityWrapper>
									<CartQuantity
										type="button"
										value="-"
										onClick={(e) => onChangeQuantity(e, el.id)}
									/>
									<CartQuantityInput
										type="text"
										step="1"
										min="0"
										size="4"
										value={el.quantity}
										disabled={true}
										inputMode="numeric"
									/>
									<CartQuantity
										type="button"
										value="+"
										onClick={(e) => onChangeQuantity(e, el.id)}
									/>
								</CartQuantityWrapper>
							</CartColumn>
							<CartColumn textalign="center" display="none">
								$
								{el.discountPrice !== 0
									? (el.discountPrice * el.quantity).toFixed(2)
									: (el.price * el.quantity).toFixed(2)}
							</CartColumn>
							<CartColumn textalign="center">
								<CartDelete onClick={() => onDeleteItem(el.id)} />
							</CartColumn>
						</CartItem>
					))}
				</CartList>
			</CartTable>
			<CartCouponForm onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					display="inline-block"
					width="20rem"
					error={errors.discount}
					{...register('discount')}
					disabled={!cart.length >= 1 || discountAdded || loading}
					placeholder="Type code"
					autoComplete="off"
				/>

				{discountAdded ? (
					<Alert success right="-17rem" top="1rem" noanimate>
						Coupon added!
					</Alert>
				) : (
					<Button
						disabled={!cart.length >= 1 || discountAdded || loading}
						marginleft="2rem"
					>
						Apply coupon
					</Button>
				)}
			</CartCouponForm>
			{errors.discount && (
				<FormError display="block">
					{errors.discount.message}
				</FormError>
			)}
			<CartCouponNote>
				Example coupon code: <strong>DISCOUNT20</strong> <br />
				You can add and delete coupons in ADMIN PANEL
			</CartCouponNote>
			{!(cart.length === 0) && (
				<CartPayment>
					<CartPaymentP>Payment method:</CartPaymentP>
					<CartPaymentWrapper>
						<CartPaymentLabel onClick={() => setPayment(1)}>
							<CartPaymentInput
								type="checkbox"
								checked={payment === 1 ? true : false}
								readOnly
							/>
							<CartPaymentIcon />
							<CartPaymentImage src={Card} />
						</CartPaymentLabel>
						<CartPaymentLabel onClick={() => setPayment(2)}>
							<CartPaymentInput
								type="checkbox"
								checked={payment === 2 ? true : false}
								readOnly
							/>
							<CartPaymentIcon />
							<CartPaymentImage src={Cash} />
						</CartPaymentLabel>
					</CartPaymentWrapper>
					{!payment && <FormError>Choose payment method</FormError>}
				</CartPayment>
			)}

			<CartTotal>
				<CartTotalContent>
					{discount && !loading && (
						<CartTotalDiscount>
							Discount:&nbsp; {discount}%
						</CartTotalDiscount>
					)}
					Total price:&nbsp; ${totalPrice.toFixed(2)}
				</CartTotalContent>
				<Button
					disabled={!cart.length >= 1 || !payment}
					width="100%"
					onClick={(e) => {
						setDispatchTotalPrice();
						setDispatchMethod();
						setDiscountCalcFlag(true);
						onChangeStep(e, 'push');
					}}
				>
					Proceed to address &#10141;
				</Button>
			</CartTotal>
		</>
	);
};
