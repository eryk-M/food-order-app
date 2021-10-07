import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';

import { device } from 'utils/breakpoints';

export const TopProductContainer = styled.figure`
	min-height: 48rem;
	position: relative;
	width: 30%;
	border: 1px solid rgba(0, 0, 0, 0.1);
	transition: all 0.2s ease-in-out;
	&:hover {
		@media (min-width: 769px) {
			transform: translateY(-1.3rem);
			box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
		}
	}
	@media ${device.mobileL} {
		width: 80%;
		min-height: 55rem;
		&:not(:first-of-type) {
			margin-top: 2rem;
		}
	}
`;

export const TopProductImage = styled.img`
	display: block;
	height: 25rem;
	width: 100%;
	object-fit: cover;
	clip-path: polygon(0 85%, 0 0, 100% 0, 100% 85%, 50% 100%);
	@media ${device.mobileL} {
		height: 40rem;
	}
	@media ${device.mobileM} {
		height: 35rem;
	}
`;

export const TopProductInfo = styled.div`
	text-align: center;
	/* margin-top: 1.5rem; */
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	height: calc(100% - 26rem);
	@media ${device.mobileL} {
		/* height: calc(100% - 34rem); */
		height: 20rem;
	}
`;

export const TopProductHeading = styled.h4`
	font-size: 1.8rem;
	padding-top: 1rem;
`;

export const TopProductIngs = styled.span`
	margin: 1rem 0;
	display: inline-block;
	font-size: 1.4rem;
	font-weight: 100;
`;

export const TopProductDesc = styled.p`
	font-size: 1.4rem;
	padding: 0 1rem;
	margin: auto 0;
`;

export const TopProductOrder = styled(Link)`
	font-size: 1.6rem;
	text-transform: uppercase;
	color: var(--color-primary);
	padding: 2rem 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	/* margin-top: 2rem; */
	transition: all 0.2s;
	margin-top: auto;
	&:hover {
		background-color: var(--color-secondary);
		color: var(--color-black);
	}
`;

export const TopProductPrice = styled.span`
	position: absolute;
	background-color: #fff;
	right: 0;
	top: 0;
	z-index: 1;
	color: #fff;
	background-color: var(--color-primary);
	padding: 1rem 1rem;
	font-size: 1.6rem;
`;

export const TopProductStars = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	padding: 0 1rem;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const TopProductSale = styled.span`
	position: absolute;
	top: 3.9rem;
	right: 0;
	z-index: 1;
	background-color: var(--color-green);
	font-size: 1.6rem;
	color: #fff;
	padding: 0.2rem 1rem;
`;
