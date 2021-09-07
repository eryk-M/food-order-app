import styled from 'styled-components/macro';
import { keyframes } from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';
import { GiConfirmed } from 'react-icons/gi';
import { BsStar } from 'react-icons/bs';

export const ProductContainer = styled.section`
	display: flex;
	border-radius: 5px;
	overflow: hidden;
	max-width: 136rem;
	margin: 5rem auto;

	@media screen and (max-width: 840px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const ProductLeft = styled.div`
	background-color: #e7272de5;
	clip-path: polygon(14% 0, 100% 0, 85% 100%, 0% 100%);

	width: 50%;
	display: flex;
	justify-content: center;
	@media screen and (max-width: 840px) {
		width: 90%;
	}
`;

export const ProductImg = styled.img`
	width: auto;
	padding: 4rem;
`;

export const ProductRight = styled.div`
	padding: 6rem;
	width: 50%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	@media screen and (max-width: 840px) {
		width: 90%;
	}
`;

export const ProductTitle = styled.h2`
	font-family: 'Rubik', sans-serif;
	font-weight: 500;
	font-size: 3.5rem;
	text-align: center;
	margin-top: 2.5rem;
`;

export const ProductDesc = styled.p`
	font-size: 1.5rem;
	margin-top: 3rem;
`;

export const ProductIngredients = styled.ul`
	list-style: circle;
	margin-top: 2rem;
	font-size: 1.6rem;
	margin-left: 2rem;
	line-height: 1.5;
`;

export const ProductIngredientsItem = styled.li``;

export const ProductButton = styled.button`
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

	&:disabled {
		cursor: default;
		opacity: 0.5;

		&:hover {
			background-color: var(--color-primary);
			color: var(--color-grey-light);
		}
	}
`;

export const ProductCartIcon = styled(FaCartPlus)`
	font-size: 2rem;
	margin-right: 1rem;
`;

export const ProductForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	position: relative;
`;

export const ProductQuantityLabel = styled.label`
	font-size: 2rem;
	margin-right: 1rem;
`;

export const ProductQuantity = styled.input`
	text-align: center;
	width: 6rem;
	/* height: 2rem;  */
	margin-right: 2rem;
	font-size: 2rem;
`;

export const ProductStar = styled(BsStar)`
	color: yellow;
	cursor: pointer;
	fill: black;
	&:not(:first-of-type) {
		margin-left: 1rem;
	}
`;

export const ProductStarIcons = styled.div`
	margin: 1rem auto;
	margin-top: 1rem;
	margin-bottom: 0rem;
	display: flex;
	font-size: 2.4rem;
`;

export const ProductRating = styled.p`
	margin-top: 1rem;
	text-align: center;
	font-size: 1.6rem;
`;

export const ProductPrice = styled.p`
	font-family: 'Arvo', serif;
	font-weight: 700;
	font-size: 3rem;
	line-height: 1.4;
	margin-top: 1rem;
	text-align: center;
	color: var(--color-primary);
	/* padding: 1rem; */
`;

export const ProductBackground = styled.div`
	height: 10rem;
	background-image: url(${(props) => props.background});
	width: 100%;
`;

// export const ProductAdded = styled.div`
// 	position: absolute;
// 	top: -5rem;
// 	right: 0;

// 	font-size: 1.6rem;
// 	color: #fff;
// 	background-color: var(--color-green);
// 	padding: 1rem;
// 	display: flex;
// 	align-items: center;
// 	opacity: 100%;
// 	font-weight: 100;
// 	border-radius: 0.5rem;
// 	animation: ${fadeInRight} 0.71s cubic-bezier(0.075, 0.82, 0.165, 1);
// `;
// export const ProductAddedIcon = styled(GiConfirmed)`
// 	margin-right: 0.5rem;
// 	font-size: 2rem;
// `;
