import styled from 'styled-components/macro';

import { FaCartPlus } from 'react-icons/fa';

export const ModalContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	/* padding: 5rem; */
	z-index: 1000;
	display: flex;
	height: 45rem;
	width: 80rem;
	border-radius: 5px;
	overflow: hidden;
`;
export const ModalClose = styled.button`
	position: absolute;
	top: 2rem;
	right: 2rem;
	z-index: 1;
	border: none;
	font-size: 2.4rem;
	background-color: transparent;
	cursor: pointer;
	font-weight: bold;
`;

export const ModalLeft = styled.div`
	background-color: #e7272de5;
	clip-path: polygon(0 0, 100% 0, 55% 100%, 0% 100%);
	width: 50%;
`;

export const ModalImg = styled.img`
	height: 32rem;
	width: auto;
	padding: 2rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-105%, -50%);
`;

export const ModalRight = styled.div`
	padding: 2rem;
	width: 50%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

export const ModalTitle = styled.h3`
	font-family: 'Rubik', sans-serif;
	font-weight: 500;
	font-size: 3.5rem;
	text-align: center;
	margin-top: 2.5rem;
`;

export const ModalDesc = styled.p`
	font-size: 1.5rem;
	margin-top: 5rem;
`;

export const ModalIngredients = styled.ul`
	list-style: circle;
	margin-top: 2rem;
	font-size: 1.6rem;
	margin-left: 2rem;
	line-height: 1.5;
`;

export const ModalIngredientsItem = styled.li``;

export const ModalButton = styled.button`
	padding: 1.2rem 1rem;
	font-size: 1.2rem;
	min-width: 13rem;
	background-color: var(--color-primary);
	text-align: center;
	color: var(--color-grey-light);
	line-height: 2.2rem;
	transition: all 0.2s;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: var(--color-secondary);
		cursor: pointer;
		color: #000;
	}
`;

export const ModalCartIcon = styled(FaCartPlus)`
	font-size: 2rem;
	margin-right: 1rem;
`;

export const ModalForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;
`;

export const ModalQuantityLabel = styled.label`
	font-size: 1.4rem;
	margin-right: 1rem;
`;

export const ModalQuantity = styled.input`
	text-align: center;
	width: 4rem;
	height: 2rem;
	margin-right: 2rem;
`;

// export const ModalOverlay = styled.div`
// 	position: absolute;
// 	background-color: rgba(0, 0, 0, 0.3);
// 	height: 100%;
// 	width: 100%;
// 	z-index: 3;
// `;
