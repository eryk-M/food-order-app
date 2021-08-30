import styled from 'styled-components/macro';

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
`;
export const ProductsWrapper = styled.div``;
export const ProductsCard = styled.figure``;
export const ProductsImg = styled.img``;
export const ProductsTitle = styled.h3``;
export const ProductsDesc = styled.p``;
export const ProductsPrice = styled.p``;

// zobaczymy
export const ProductsButton = styled.div``;
