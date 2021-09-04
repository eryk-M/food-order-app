import styled from 'styled-components/macro';

import { ImBin } from 'react-icons/im';

export const CartWrapper = styled.div`
	max-width: 136rem;
	margin: 0 auto;
	padding: 2rem;
`;

export const CartContainer = styled.div`
	/* background-color: red; */
	max-width: 100rem;
	margin: 2rem auto;
`;

export const CartList = styled.ul``;

export const CartItem = styled.li`
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

export const CartDelete = styled(ImBin)`
	cursor: pointer;
	font-size: 2rem;
`;
