import React, { useContext, useEffect } from 'react';

import {
	CartList,
	CartItem,
	CartColumn,
	CartImage,
	CartDelete,
	CartCouponInput,
	CartCouponForm,
	CartQuantity,
	CartTotal,
	CartLink,
	CartTotalContent,
	CartNoItems,
	CartTable,
} from './CartOrderElements';

import Button from 'components/Button/index';

import { CartContext } from 'contexts/CartContext';

const CartOrder = ({
	setDispatchTotalPrice,
	step,
	totalPrice,
	onChangeStep,
}) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const findItem = (id) => {
		const item = cart.find((el) => el.id === id);
		return item;
	};

	useEffect(() => {
		if (step !== 0) onChangeStep(undefined, 'begin');
	}, [step, onChangeStep]);

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
								{el.quantity}{' '}
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
			<CartCouponForm>
				<CartCouponInput
					disabled={!cart.length >= 1}
					placeholder="Coupon code"
				/>
				<Button disabled={!cart.length >= 1} marginleft="2rem">
					Apply coupon
				</Button>
			</CartCouponForm>
			<CartTotal>
				<CartTotalContent>
					<strong>Total price:</strong>&nbsp; ${totalPrice.toFixed(2)}
				</CartTotalContent>
				<Button
					disabled={!cart.length >= 1}
					width="100%"
					onClick={(e) => {
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
