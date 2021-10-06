import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const OrdersTableWrapper = styled.div`
	overflow-y: scroll;
	height: 50rem;
`;

export const OrdersNoDataP = styled.p`
	text-align: center;
	font-size: 1.4rem;
	margin-bottom: 2rem;
`;

export const OrdersNoDataWrapper = styled.div`
	margin: 0 auto;
	display: block;
	position: absolute;
	left: 50%;
	top: 35rem;
	opacity: 0.8;

	@media only screen and (max-width: 570px) {
		left: 33%;
		top: 40rem;
	}

	@media ${device.mobileM} {
		left: 25%;
	}
`;

export const OrdersNoData = styled.img`
	width: 20rem;
`;
