import React, { useState } from 'react';

import { Steps } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import {
	CartWrapper,
	CartContainer,
	CartList,
	CartItem,
	CartColumn,
	CartImage,
	CartDelete,
} from './CartElements';

//testing
import Image from '../../images/burger-chicken_cut.jpg';

const Cart = () => {
	const [step, setStep] = useState(0);

	return (
		<CartWrapper>
			<Steps current={0}>
				<Steps.Item title="Order details" />
				<Steps.Item title="Address" />
				<Steps.Item title="Checkout summary" />
				<Steps.Item title="Finish" />
			</Steps>
			<CartContainer>
				<CartList>
					<CartItem>
						<CartColumn>
							<CartImage src={Image} />
						</CartColumn>
						<CartColumn width="50%">Cheese Burger</CartColumn>
						<CartColumn width="16.6%">$5.00</CartColumn>
						<CartColumn width="20%">- 1 +</CartColumn>
						<CartColumn>$5.00</CartColumn>
						<CartColumn>
							<CartDelete />
						</CartColumn>
					</CartItem>
				</CartList>
			</CartContainer>
		</CartWrapper>
	);
};

export default Cart;
