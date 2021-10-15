import styled from 'styled-components/macro';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosResize } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { device } from 'utils/breakpoints';

export const ProductContainer = styled.section`
	display: flex;
	border-radius: 5px;
	max-width: 136rem;
	margin: 5rem auto;
	margin-top: 2rem;
	@media screen and (max-width: 840px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const SliderContainer = styled.div`
	max-width: 50rem;
	overflow: hidden;
	margin: 0 auto;
	position: relative;
	border: 10px solid transparent;

	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	border-radius: 24px;
	&:before {
		content: 'SALE';
		position: absolute;
		left: 1rem;
		top: 1rem;
		background-color: var(--color-green);
		font-size: 1.4rem;
		color: var(--color-white);
		padding: 0.5rem;
		border-radius: 5px;
		z-index: 1;
		visibility: ${({ discount }) =>
			discount ? 'visible' : 'hidden'};
	}

	@media ${device.mobileM} {
		max-width: 40rem;
		height: 45rem;
	}
`;

export const SlideShow = styled.img`
	min-width: 100%;
	object-fit: cover;
`;

export const SliderShowcase = styled.div`
	display: flex;
	width: 50rem;
	height: 35rem;
	transition: all 0.5s ease;
	object-position: 60% top;
	&:hover {
		cursor: -webkit-zoom-in;
		cursor: zoom-in;
	}
	@media ${device.mobileM} {
		width: 40rem;
		height: 32rem;
	}
`;

export const SliderSelect = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.8rem;
`;

export const SlideItem = styled.div`
	width: 32%;
	height: auto;
	object-fit: cover;
	&:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	img {
		object-fit: cover;
		height: 15rem;
		object-position: center;
		@media ${device.mobileM} {
			height: 10rem;
		}
	}
`;

export const ProductLeft = styled.div`
	width: 50%;
	@media screen and (max-width: 840px) {
		width: 90%;
	}

	img {
		width: 100%;
		display: block;
	}
`;

export const ProductImg = styled.img`
	width: auto;
	padding: 4rem;

	object-fit: cover;
`;

export const ProductRight = styled.div`
	padding: 3rem;
	width: 50%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	@media screen and (max-width: 840px) {
		width: 90%;
		padding: 1rem;
	}
`;

export const ProductTitle = styled.h2`
	font-family: 'Arvo', sans-serif;
	font-weight: 700;
	font-size: 3.5rem;
	text-align: center;
	color: var(--color-grey-dark);
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
		@media (min-width: 1025px) {
			background-color: var(--color-secondary);
			cursor: pointer;
			color: #000;
		}
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

	@media ${device.mobileM} {
		margin-top: 2rem;
	}
`;

export const ProductStar = styled(FaStar)`
	cursor: pointer;
	color: #e4e5e9;
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
	text-decoration: ${({ discount }) =>
		discount ? 'line-through' : 'none'};
	color: ${({ discount }) =>
		discount
			? 'var(--color-grey-light-2)'
			: 'var(--color-primary)'}; ;
`;

export const ProductBackground = styled.div`
	height: 10rem;
	background-image: url(${({ background }) => background});
	width: 100%;
`;

export const ResizeIcon = styled(IoIosResize)`
	position: absolute;
	top: 1rem;
	right: 1rem;
	font-size: 3rem;
	color: var(--color-grey-light);
	z-index: 1;
`;

export const ProductQuantityWrapper = styled.div`
	margin-right: 2rem;
	background-color: var(--color-background-grey-light);
	border-radius: 25px;
`;
export const ProductQuantity = styled.input`
	font-size: 2rem;
	padding: 1.3rem 2rem;
	background: none;
	cursor: pointer;
	border: none;

	&:disabled {
		cursor: default;
	}
`;

export const ProductQuantityLabel = styled.label`
	font-size: 2rem;
`;
export const ProductQuantityInput = styled.input`
	text-align: center;
	width: 6rem;
	font-size: 2rem;
	border: none;
`;

export const ProductGoBack = styled.div`
	max-width: 136rem;
	margin: 0 auto;
	display: flex;
	justify-content: right;
	padding: 0 2rem;

	button {
		padding: 1rem 2rem;
		font-size: 1.6rem;
		margin-top: 2rem;
		background-color: var(--color-primary);
		color: #fff;
		border: none;
	}
`;

export const ReturnGoBackIcon = styled(RiArrowGoBackLine)`
	vertical-align: middle;
`;
