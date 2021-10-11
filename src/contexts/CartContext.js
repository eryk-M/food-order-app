import React, { createContext, useReducer } from 'react';

import { cartReducer } from './Reducers';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, {
		address: {},
		cart: [],
		totalPrice: 0,
		payment: 0,
	});

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
