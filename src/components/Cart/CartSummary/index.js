import React from 'react';

import { Redirect } from 'react-router-dom';

//, phone, address, city, zip,
const CartSummary = ({ step }) => {
	if (step === 0) return <Redirect to="/cart" />;

	return (
		<div>
			<div> Cart summary </div>
			<div>{}</div>
			{/* <div> name: {name.current && name.current.value} </div>
			<div> phone: {phone.current && phone.current.value} </div>
			<div> address: {address.current && address.current.value} </div>
			<div> city: {city.current && city.current.value} </div>
			<div> zip: {zip.current && zip.current.value} </div> */}
		</div>
	);
};

export default CartSummary;
