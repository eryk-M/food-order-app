import React, { useState, useContext, useEffect } from 'react';

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
} from './CartOrderElements';

import Button from '../../Button/index';

import { CartContext } from '../../../contexts/CartContext';

const CartOrder = ({ totalPrice, onChangeStep }) => {
	const {
		state: { cart },
		dispatch,
	} = useContext(CartContext);

	const findItem = (e) => {
		const item = cart.find(
			(el) => el.id === Number(e.currentTarget.dataset.id)
		);
		return item;
	};

	const onDeleteItem = (e) => {
		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: findItem(e),
		});
	};

	const onChangeQuantity = (e) => {
		const sign = e.currentTarget.innerText;
		switch (sign) {
			case '+':
				dispatch({
					type: 'ADD_QUANTITY',
					payload: findItem(e),
				});
				break;
			case '-':
				dispatch({
					type: 'REMOVE_QUANTITY',
					payload: findItem(e),
				});
				break;
			default:
				break;
		}
	};

	return (
		<>
			<CartList>
				<CartItem backgroundColor="#93949417" fontW="bold">
					<CartColumn width="25rem"></CartColumn>
					<CartColumn width="50%">Name</CartColumn>
					<CartColumn width="14.6%">Price</CartColumn>
					<CartColumn width="18.5%">Quantity</CartColumn>
					<CartColumn width="6%">Total</CartColumn>
					<CartColumn>Delete</CartColumn>
				</CartItem>

				{cart.map((el) => (
					<CartItem key={el.id}>
						<CartColumn>
							<CartLink to={`/product/${el.id}`}>
								<CartImage src={el.img} />
							</CartLink>
						</CartColumn>
						<CartColumn width="50%">
							<CartLink to={`/product/${el.id}`}>{el.name}</CartLink>
						</CartColumn>
						<CartColumn width="16.6%">
							${el.price.toFixed(2)}
						</CartColumn>
						<CartColumn width="20%">
							<CartQuantity
								data-id={el.id}
								onClick={(e) => onChangeQuantity(e)}
							>
								-
							</CartQuantity>
							{el.quantity}{' '}
							<CartQuantity
								data-id={el.id}
								onClick={(e) => onChangeQuantity(e)}
							>
								+
							</CartQuantity>
						</CartColumn>
						<CartColumn>
							${(el.price * el.quantity).toFixed(2)}
						</CartColumn>
						<CartColumn>
							<CartDelete
								onClick={(e) => onDeleteItem(e)}
								data-id={el.id}
							/>
						</CartColumn>
					</CartItem>
				))}
			</CartList>
			<CartCouponForm>
				<CartCouponInput
					disabled={!cart.length >= 1}
					placeholder="Coupon code"
				/>
				<Button disabled={!cart.length >= 1} marginLeft="2rem">
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
					onClick={() => onChangeStep()}
				>
					Proceed to address
				</Button>
			</CartTotal>
		</>
	);
};

export default CartOrder;
