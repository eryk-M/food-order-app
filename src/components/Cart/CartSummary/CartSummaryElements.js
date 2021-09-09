import styled from 'styled-components/macro';

import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

export const CartSummaryContainer = styled.div`
	max-width: 90rem;
	display: flex;
	justify-content: space-between;

	margin: 0 auto;
	padding: 3rem;
`;
export const CartSummaryDetails = styled.div``;
export const CartSummaryDetailsHeading = styled.h2`
	font-size: 2rem;
	margin-top: 1rem;
	font-family: 'Rubik', sans-serif;
`;
export const CartSummaryItem = styled.div`
	/* border: 1px solid var(--color-green); */
	margin-top: 1rem;
	/* padding-left: 2rem; */
	margin-left: 7rem;
	padding-bottom: 2rem;
	display: ${(props) => (props.flex ? 'flex' : 'block')};
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
`;
export const CartSummaryOrder = styled.div`
	margin-left: 1rem;
`;
export const CartSummaryOrderInfo = styled.p`
	line-height: 1.7;
	font-size: 1.4rem;
	margin-left: 2rem;
	font-weight: ${(props) => props.fontW};
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
	/* background-color: #e2e2e2; */
	padding: 2rem;
	width: 25rem;
	border-top: 5px solid var(--color-primary);
`;
export const CartSummaryTotalHeading = styled.h2`
	font-size: 1.6rem;
	font-family: 'Rubik', sans-serif;
	padding-bottom: 2rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
export const CartSummaryTotalItem = styled.p`
	margin-top: 2rem;
	font-size: ${(props) => (props.total ? '1.6rem' : '1.4rem')};
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
