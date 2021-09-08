import React, { useContext } from 'react';

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
} from './CartOrderElements';

import Button from '../../Button/index';

import { CartContext } from '../../../contexts/CartContext';

const CartOrder = ({ totalPrice, onChangeStep }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const findItem = (id) => {
		const item = cart.find((el) => el.id === id);
		return item;
	};

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
			<CartList>
				{cart.length >= 1 && (
					<CartItem backgroundColor="#93949417" fontW="bold">
						<CartColumn
							width="25rem"
							mobileWidth="20rem"
						></CartColumn>
						<CartColumn width="50%" mobileWidth="10rem">
							Name
						</CartColumn>
						<CartColumn width="14.6%">Price</CartColumn>
						<CartColumn width="18.5%">Quantity</CartColumn>
						<CartColumn width="6%" display="none">
							Total
						</CartColumn>
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
						<CartColumn width="50%" mobileWidth="10rem">
							<CartLink to={`/product/${el.id}`}>{el.name}</CartLink>
						</CartColumn>
						<CartColumn width="16.6%">
							${el.price.toFixed(2)}
						</CartColumn>
						<CartColumn
							width="20%"
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
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
					onClick={(e) => onChangeStep(e)}
				>
					Proceed to address &#10141;
				</Button>
			</CartTotal>
		</>
	);
};

export default CartOrder;
