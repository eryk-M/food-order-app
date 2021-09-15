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

import { useLocation, useHistory, Redirect } from 'react-router-dom';

import ButtonLink from 'components/ButtonLink';

const CartComplete = ({ step }) => {
	const [orderId, setOrderId] = useState('');
	const [copied, setCopied] = useState(false);

	const { order } = useLocation();
	const history = useHistory();

	useEffect(() => {
		window.history.pushState(
			null,
			document.title,
			window.location.href
		);
		window.addEventListener('popstate', function () {
			window.history.pushState(
				null,
				document.title,
				window.location.href
			);
		});
		setOrderId(order);
		return () => {
			setOrderId('');
		};
	}, [order, history]);

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

export default CartComplete;
