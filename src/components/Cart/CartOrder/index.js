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
} from './CartOrderElements';

import { FormError, FormInput } from 'components/Form/FormElements';

import Button from 'components/Button/index';
import Cash from 'images/cash.png';
import Card from 'images/card.jpg';
import { CartContext } from 'contexts/CartContext';
import { useApi } from 'contexts/APIContext';

import { Alert } from 'components/Alert';

import Loader from 'components/Loader';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CartOrder = ({
	setDispatchTotalPrice,
	step,
	totalPrice,
	onChangeStep,
	payment,
	setPayment,
	setDiscount,
	discount,
	setTotalPrice,
}) => {
	const { validateDiscountCode } = useApi();
	const [loading, setLoading] = useState(false);
	const [discountAdded, setDiscountAdded] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const validationSchema = Yup.object().shape({
		discount: Yup.string().test(
			'discount',
			'Discount code is not valid!',
			async (value) => {
				const response = await validateDiscountCode(value);
				return !response.empty;
			}
		),
	});

	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const findItem = (id) => {
		const item = cart.find((el) => el.id === id);
		return item;
	};

	useEffect(() => {
		if (step !== 0) onChangeStep(undefined, 'begin');
		if (discount && !discountAdded) {
			const discountPrice =
				totalPrice - totalPrice * (discount / 100);
			setTotalPrice(discountPrice);
			setDiscountAdded(true);
		}
	}, [
		step,
		onChangeStep,
		discount,
		discountAdded,
		setTotalPrice,
		totalPrice,
	]);

	const onDeleteItem = (id) => {
		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: findItem(id),
		});
	};
	const onChangeQuantity = (e, id) => {
		const sign = e.currentTarget.innerText;
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
		const response = await validateDiscountCode(data.discount);
		const docs = response.docs[0].data();
		setDiscount(docs.discount);
		setLoading(false);
		setShowSuccess(true);
		setTimeout(() => {
			setShowSuccess(false);
		}, 3000);
	};
	return (
		<>
			<CartTable>
				<CartList>
					{cart.length >= 1 && (
						<CartItem backgroundColor="#93949417" fontW="bold">
							<CartColumn></CartColumn>
							<CartColumn>Name</CartColumn>
							<CartColumn>Price</CartColumn>
							<CartColumn>Quantity</CartColumn>
							<CartColumn display="none">Total</CartColumn>
							<CartColumn>Delete</CartColumn>
						</CartItem>
					)}

					{cart.length === 0 && (
						<CartNoItems>Your cart is empty.</CartNoItems>
					)}

					{cart.map((el) => (
						<CartItem key={el.id}>
							<CartColumn>
								<CartLink to={`/product/${el.id}`}>
									<CartImage src={el.img} />
								</CartLink>
							</CartColumn>
							<CartColumn>
								<CartLink to={`/product/${el.id}`}>
									{el.name}
								</CartLink>
							</CartColumn>
							<CartColumn>${el.price.toFixed(2)}</CartColumn>
							<CartColumn>
								<CartQuantity
									onClick={(e) => onChangeQuantity(e, el.id)}
								>
									-
								</CartQuantity>
								{el.quantity}
								<CartQuantity
									onClick={(e) => onChangeQuantity(e, el.id)}
								>
									+
								</CartQuantity>
							</CartColumn>
							<CartColumn display="none">
								${(el.price * el.quantity).toFixed(2)}
							</CartColumn>
							<CartColumn>
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
					placeholder="Type DISCOUNT20"
					autoComplete="off"
				/>

				<Button
					disabled={!cart.length >= 1 || discountAdded || loading}
					marginleft="2rem"
				>
					Apply coupon
				</Button>
				{loading && (
					<Loader primary display="inline-block" marginleft="2rem" />
				)}
				{showSuccess && (
					<Alert success bottom="0" left="0">
						Coupon added!
					</Alert>
				)}
			</CartCouponForm>
			{errors.discount && (
				<FormError display="inline-block">
					{errors.discount.message}
				</FormError>
			)}
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
							<strong>Discount:</strong>&nbsp; {discount}%
						</CartTotalDiscount>
					)}
					<strong>Total price:</strong>&nbsp; ${totalPrice.toFixed(2)}
				</CartTotalContent>
				<Button
					disabled={!cart.length >= 1 || !payment}
					width="100%"
					onClick={(e) => {
						setDispatchMethod();
						setDispatchTotalPrice();
						onChangeStep(e, 'push');
					}}
				>
					Proceed to address &#10141;
				</Button>
			</CartTotal>
		</>
	);
};

export default CartOrder;
