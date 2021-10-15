import styled from 'styled-components/macro';

import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { device } from 'utils/breakpoints';

export const CartSummaryContainer = styled.div`
	max-width: 90rem;
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	padding: 3rem;

	@media ${device.mobileM} {
		flex-direction: column-reverse;
		padding: 0 1rem;
	}
`;
export const CartSummaryDetails = styled.div``;
export const CartSummaryDetailsHeading = styled.h2`
	font-size: 2rem;
	margin-top: 1rem;
	font-family: 'Rubik', sans-serif;
`;
export const CartSummaryItem = styled.div`
	margin-top: 1rem;
	margin-left: 7rem;
	padding-bottom: 2rem;
	display: ${({ flex }) => (flex ? 'flex' : 'block')};
	&:first-of-type {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
`;

export const CartSummaryIconWrapper = styled.span`
	background-color: var(--color-primary);
	height: 4rem;
	width: 4rem;
	display: inline-block;
	position: relative;
	border-radius: 50%;
	vertical-align: -1rem;
	margin-right: 2rem;
`;

export const CartSummaryAddressIcon = styled(HiOutlineLocationMarker)`
	font-size: 2.4rem;
	color: var(--color-grey-light);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const CartSummaryCartIcon = styled(FiShoppingCart)`
	font-size: 2.4rem;
	color: var(--color-grey-light);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const CartSummaryAddressInfo = styled.p`
	line-height: 1.5;
	font-size: 1.4rem;
`;
export const CartSummaryOrderImage = styled.img`
	display: block;
	height: 15rem;
	width: 15rem;
	object-fit: cover;
	@media ${device.mobileM} {
		height: 10rem;
		width: 10rem;
	}
`;
export const CartSummaryOrder = styled.div`
	margin-left: 1rem;
`;
export const CartSummaryOrderInfo = styled.p`
	line-height: 1.7;
	font-size: 1.4rem;
	margin-left: 2rem;
	font-weight: ${({ fontW }) => fontW};
	&:first-of-type {
		font-family: 'Arvo';
	}
	& span {
		font-weight: bold;
	}
`;
export const CartSummaryButton = styled.button``;
export const CartSummaryTotal = styled.div`
	max-height: 30rem;
	padding: 2rem;
	width: 25rem;
	border-top: 5px solid var(--color-primary);
	@media ${device.mobileM} {
		width: 100%;
	}
`;
export const CartSummaryTotalHeading = styled.h2`
	font-size: 1.6rem;
	font-family: 'Rubik', sans-serif;
	padding-bottom: 2rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
export const CartSummaryTotalItem = styled.p`
	margin-top: 2rem;
	font-size: ${({ total }) => (total ? '1.6rem' : '1.4rem')};
	display: flex;
	justify-content: space-between;

	&:last-of-type {
		padding: 2rem;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
	}

	& span {
		&:last-of-type {
			font-weight: bold;
		}
	}
`;

export const CartSummaryButtonWrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: space-between;
`;
