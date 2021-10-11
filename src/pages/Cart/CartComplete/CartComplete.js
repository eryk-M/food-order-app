import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
	CartCompleteContainer,
	CartCompleteIcon,
	CartCompleteOrderId,
	CartCompleteNote,
	CopyIcon,
	CartCompleteOrderContainer,
	CopyIconContainer,
	ShowCopyMessage,
} from './CartCompleteElements';

import { useLocation, Redirect, useHistory } from 'react-router-dom';

import { ButtonLink } from 'components';

export const CartComplete = ({ step }) => {
	const [orderId, setOrderId] = useState('');
	const [copied, setCopied] = useState(false);
	const [locationKeys, setLocationKeys] = useState([]);

	const history = useHistory();
	const { order } = useLocation();

	useEffect(() => {
		setOrderId(order);
		return history.listen((location) => {
			if (history.action === 'POP') {
				if (locationKeys[1] === location.key) {
					setLocationKeys(([_, ...keys]) => keys);
				} else {
					setLocationKeys((keys) => [location.key, ...keys]);
					const response = window.confirm(
						'Are you sure you want to go back? You will be redirected to first step!'
					);

					if (response) {
						history.push('/cart');
					} else {
						history.push({
							pathname: '/cart/complete',
							order: orderId,
						});
					}
				}
			}
		});
	}, [order, history, locationKeys, orderId]);

	if (step === 0) return <Redirect to="/cart" />;

	return (
		<CartCompleteContainer>
			<CartCompleteIcon />
			<CartCompleteOrderContainer>
				<CartCompleteOrderId>
					ORDER ID: <strong>{orderId}</strong>
				</CartCompleteOrderId>
				<CopyToClipboard
					text={orderId}
					onCopy={() => setCopied(true)}
				>
					<CopyIconContainer>
						<CopyIcon>Copy</CopyIcon>
					</CopyIconContainer>
				</CopyToClipboard>
				{copied && <ShowCopyMessage>Copied!</ShowCopyMessage>}
			</CartCompleteOrderContainer>
			<CartCompleteNote>
				Thank you for your order. <br />
				<br />
				Please save your order ID and check Food Tracker progress with
				it.
				<br /> If you have account you can find your orders in user
				profile.
			</CartCompleteNote>
			<ButtonLink
				font="1.6rem"
				to={{ pathname: '/food-tracker', orderId: orderId }}
			>
				Go to Food Tracker
			</ButtonLink>
		</CartCompleteContainer>
	);
};
