import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const ProductsContainer = styled.section`
	max-width: 136rem;
	margin: 4rem auto;
`;
export const ProductsHeading = styled.h2`
	text-align: center;
	font-size: 5.5rem;
	text-transform: capitalize;
`;
export const ProductsFilter = styled.div`
	margin: 4rem 0;
	text-transform: uppercase;
	font-size: 1.3rem;
	font-family: 'Arvo', sans-serif;
	display: flex;
	justify-content: center;
`;
export const ProductsOption = styled.p`
	cursor: pointer;
	&:not(:first-of-type) {
		margin-left: 5rem;
	}
	&.active {
		border-bottom: 3px solid var(--color-primary);
	}
`;
export const ProductsWrapper = styled.div`
	width: 90vw;
	margin: 0 auto;
	display: grid;
	max-width: 136rem;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	grid-column-gap: 1.5rem;
	grid-row-gap: 2rem;
`;

export const ProductsImg = styled.img`
	display: block;
	width: 100%;
	min-height: 12rem;
	height: 25rem;
	object-fit: cover;
`;
export const ProductsLink = styled(Link)`
	color: #000;
`;
export const ProductsCard = styled.figure`
	font-family: 'Rubik', sans-serif;
	text-align: center;
	transform: translateY(0);
	transition: all 0.1s;
	border-radius: 5px;
	overflow: hidden;
	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 0.1rem 3rem rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
`;
export const ProductsTitle = styled.h3`
	font-size: 2rem;
	margin: 2rem 0;
	line-height: 1.4;
	font-weight: 500;
	font-family: 'Rubik', sans-serif;
`;
export const ProductsDesc = styled.p`
	font-weight: 300;
	font-size: 1.5rem;
	line-height: 1.5;
	padding: 1rem;
`;
export const ProductsPrice = styled.p`
	font-family: 'Arvo', serif;
	font-weight: 700;
	font-size: 2.5rem;
	line-height: 1.4;
	margin-top: 2rem;
	color: var(--color-primary);
	padding: 1rem;
`;

// zobaczymy
export const ProductsButton = styled.div``;
