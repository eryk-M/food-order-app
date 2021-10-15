import styled from 'styled-components/macro';

import { FaShippingFast } from 'react-icons/fa';

export const CartAddressContainer = styled.div`
	max-width: 50rem;
	margin: 0 auto;
	padding: 0 1rem;
`;

export const CartAddressSteps = styled.div`
	margin-top: 3rem;
	display: flex;
	justify-content: space-between;
`;

export const CartAddressHeading = styled.h2`
	font-family: 'Rubik', sans-serif;
	font-size: 3rem;
	margin: 0 auto;
	margin-bottom: 2rem;
	justify-content: center;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding-bottom: 1rem;
	max-width: 50rem;
	font-weight: 400;
`;

export const CartAddressIcon = styled(FaShippingFast)`
	font-size: 4rem;
	fill: var(--color-grey-dark);
	margin-left: ${({ marginleft }) => marginleft};
`;
