import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';
import { TableRow, TableCell } from 'components';

export const OrdersTableRow = styled(TableRow)`
	@media ${device.mobileM} {
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
`;

export const OrdersTableWrapper = styled.div`
	overflow-y: scroll;
	height: 50rem;
	${TableRow}:nth-of-type(odd) {
		@media ${device.mobileM} {
			margin-top: 2rem;
		}
	}
	${TableRow} {
		@media ${device.mobileM} {
			margin-left: 0.5rem;
			margin-right: 0.5rem;
		}
	}
	${TableRow}:nth-of-type(odd) {
		${TableCell}:first-of-type {
			@media ${device.mobileM} {
				background-color: var(--color-background-grey-light);
			}
		}
	}
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
