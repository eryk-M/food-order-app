import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import { CartContext } from '../../../contexts/CartContext';

//, phone, address, city, zip,
const CartSummary = ({ step }) => {
	const {
		state: { cart, address, totalPrice },
	} = useContext(CartContext);

	if (step === 0) return <Redirect to="/cart" />;

	console.log(cart, address, totalPrice);
	return (
		<div>
			<div> Cart summary </div>
			{cart.map((el) => (
				<div key={el.id} style={{ fontSize: '5rem' }}>
					{el.name}
				</div>
			))}
			<div style={{ fontSize: '5rem' }}>{address.name}</div>
			<div style={{ fontSize: '5rem' }}>{address.address}</div>
			<div style={{ fontSize: '5rem' }}>{address.phone}</div>
			<div style={{ fontSize: '5rem' }}>{address.city}</div>
			<div style={{ fontSize: '5rem' }}>{address.zip}</div>
			<div style={{ fontSize: '5rem' }}>{totalPrice}</div>
		</div>
	);
};

export default CartSummary;
