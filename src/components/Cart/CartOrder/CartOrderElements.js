import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { ImBin } from 'react-icons/im';

export const CartWrapper = styled.div`
	max-width: 136rem;
	margin: 0 auto;
	padding: 2rem;
`;

export const CartContainer = styled.div`
	font-family: 'Rubik';
	max-width: 100rem;
	margin: 4rem auto;
`;

export const CartList = styled.ul``;

export const CartLink = styled(Link)`
	color: #000;
`;

export const CartItem = styled.li`
	background-color: ${(props) => props.backgroundColor};
	font-weight: ${(props) => props.fontW};
	font-size: 1.6rem;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const CartColumn = styled.div`
	width: ${(props) => props.width};
	padding: 2rem;
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
