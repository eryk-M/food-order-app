import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { ImBin } from 'react-icons/im';

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
	background-color: ${(props) => props.backgroundColor};
	display: table-row;
	font-weight: ${(props) => props.fontW};
	font-size: 1.6rem;
`;

export const CartColumn = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	display: table-cell;
	vertical-align: middle;
	padding: 2rem;
	@media only screen and (max-width: 840px) {
		width: ${(props) => props.mobileWidth};
	}

	@media only screen and (max-width: 630px) {
		display: ${(props) => props.display};
		flex-direction: ${(props) => props.flexDirection};
		align-items: ${(props) => props.alignItems};
	}
`;

export const CartImage = styled.img`
	height: 15rem;
`;

export const CartQuantity = styled.button`
	padding: 0.5rem;
	margin: 0 0.5rem;
	background-color: unset;
	border: 1px solid rgba(0, 0, 0, 0.2);
	cursor: pointer;
`;

export const CartDelete = styled(ImBin)`
	cursor: pointer;
	font-size: 2rem;
`;

export const CartTotal = styled.div`
	margin-top: 3rem;
	width: 40%;
	margin-left: auto;
	background-color: grey;
	background-color: #93949417;
`;

export const CartTotalContent = styled.p`
	font-size: 2rem;
	display: flex;
	justify-content: center;
	color: #000;
	padding: 2rem;
`;

export const CartCouponForm = styled.form`
	margin-top: 2rem;
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
