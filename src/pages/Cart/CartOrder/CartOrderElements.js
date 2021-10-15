import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle, AiOutlineDelete } from 'react-icons/ai';

import { device } from 'utils/breakpoints';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const CartWrapper = styled.div`
	max-width: 136rem;
	margin: 0 auto;
	padding: 2rem;
	@media only screen and (max-width: 840px) {
		padding: 0.5rem;
	}
`;

export const CartContainer = styled.div`
	font-family: 'Rubik';
	max-width: 100rem;
	margin: 4rem auto;
`;

export const CartList = styled.div`
	display: table-row-group;
`;

export const CartTable = styled.div`
	display: table;
	width: 100%;
`;
export const CartLink = styled(Link)`
	color: #000;
`;

export const CartItem = styled.div`
	background-color: ${({ backgroundColor }) => backgroundColor};
	display: table-row;
	font-weight: ${({ fontW }) => fontW};
	font-size: 1.6rem;
`;

export const CartColumn = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: table-cell;
	vertical-align: middle;
	padding: 2rem;
	text-align: ${({ textalign }) => textalign};

	@media only screen and (max-width: 840px) {
		width: ${({ mobileWidth }) => mobileWidth};
	}

	@media only screen and (max-width: 640px) {
		display: ${({ display }) => display};
		flex-direction: ${({ flexDirection }) => flexDirection};
		align-items: ${({ alignItems }) => alignItems};
		text-align: center;
		justify-content: ${({ justifyContent }) => justifyContent};
		padding: 1rem 0.5rem;
	}
`;

export const CartImage = styled(LazyLoadImage)`
	height: 15rem;
	width: 15rem;
	object-fit: cover;
	border-radius: 5px;
	@media ${device.mobileL} {
		height: 10rem;
		width: 10rem;
	}

	@media ${device.mobileM} {
		height: 5rem;
		width: 5rem;
	}
`;

export const CartDelete = styled(AiOutlineDelete)`
	cursor: pointer;
	font-size: 2.2rem;
	color: var(--color-grey-dark);
`;

export const CartTotal = styled.div`
	margin-top: 3rem;
	width: 40%;
	margin-left: auto;
	background-color: var(--color-background-grey-light);
	@media ${device.MobileL} {
		width: 33rem;
		margin-right: 2rem;
	}
`;

export const CartTotalContent = styled.p`
	font-size: 2rem;
	text-align: center;
	color: #000;
	padding: 2rem;
`;

export const CartCouponForm = styled.form`
	margin-top: 2rem;
	position: relative;
	display: inline-block;

	@media ${device.mobileL} {
		margin-left: 0.5rem;
	}
`;

export const CartCouponInput = styled.input`
	padding: 1rem;
	font-size: 1.4rem;

	&::placeholder {
		opacity: 0.5;
	}
`;

export const CartNoItems = styled.p`
	text-align: center;
	margin: 2rem 0;
	font-size: 2rem;
	opacity: 0.7;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	padding-top: 3rem;
`;

export const CartPayment = styled.div`
	width: 40%;
	margin-left: auto;

	@media ${device.tablet} {
		width: 35rem;
	}
	@media ${device.MobileL} {
		margin-top: 2rem;
	}
`;

export const CartPaymentWrapper = styled.div`
	display: flex;
	margin-top: 2rem;
`;

export const CartPaymentP = styled.p`
	font-size: 1.8rem;
`;

export const CartPaymentLabel = styled.label`
	display: block;
	position: relative;
	&:not(:first-of-type) {
		margin-left: 2rem;
	}
`;

export const CartPaymentImage = styled.img`
	height: 10rem;
	padding: 1rem;
	outline: none;
	outline: 1px solid rgba(0, 0, 0, 0.2);
`;

export const CartPaymentIcon = styled(AiFillCheckCircle)`
	position: absolute;
	font-size: 2.4rem;
	color: var(--color-green);
	left: -1.5rem;
	top: -1.5rem;
	opacity: 0;
`;

export const CartPaymentInput = styled.input`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	opacity: 0;

	&:checked ~ ${CartPaymentIcon} {
		opacity: 1;
	}

	&:checked ~ ${CartPaymentImage} {
		outline: 2px solid var(--color-green);
	}
`;

export const CartTotalDiscount = styled.span`
	display: block;
	color: var(--color-green);
	margin-bottom: 2rem;
`;

export const CartCouponNote = styled.p`
	font-size: 1.4rem;
	line-height: 1.5;

	@media ${device.mobileL} {
		margin-left: 0.5rem;
	}
`;

export const CartCodeAdded = styled.span`
	display: block;
	font-size: 1.4rem;
	padding: 1rem;
	width: 10rem;
	border-radius: 5px;
	color: var(--color-white);
	background-color: var(--color-green);
`;

export const CartQuantity = styled.input`
	padding: 0.7rem;
	background-color: transparent;
	cursor: pointer;
	border: none;
`;

export const CartQuantityInput = styled.input`
	max-width: 2rem;
	text-align: center;
	font-size: 1.6rem;

	border: none;
	&:disabled {
		background-color: transparent;
		color: inherit;
	}
`;

export const CartQuantityWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-background-grey-light);
	padding: 0.5rem 1rem;
	border-radius: 25px;
	justify-content: space-between;
	@media ${device.mobileL} {
		flex-direction: column;
		display: inline-flex;
	}
`;
