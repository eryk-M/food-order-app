import React from 'react';

const CartAddress = ({ onChangeStep }) => {
	return (
		<div>
			Cart address
			<button onClick={() => onChangeStep('back')}>Back</button>
		</div>
	);
};

export default CartAddress;
