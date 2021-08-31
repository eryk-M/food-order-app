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
export const ProductsWrapper = styled.div`
	width: 90vw;
	margin: 0 auto;
	display: grid;
	max-width: 136rem;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	grid-column-gap: 1.5rem;
	grid-row-gap: 2rem;
`;
export const ProductsCard = styled.figure`
	font-family: 'Rubik', sans-serif;
	text-align: center;
`;
export const ProductsImg = styled.img`
	display: block;
	width: 100%;
	min-height: 12rem;
	/* height: 30%; */
	/* width: auto; */
`;
export const ProductsTitle = styled.h3`
	font-size: 2rem;
	margin: 2rem 0;
	line-height: 1.4;
	font-weight: 500;
`;
export const ProductsDesc = styled.p`
	font-weight: 300;
	font-size: 1.5rem;
	line-height: 1.5;
`;
export const ProductsPrice = styled.p`
	font-family: 'Arvo', serif;
	font-weight: 700;
	font-size: 2.5rem;
	line-height: 1.4;
	margin-top: 2rem;
	color: var(--color-secondary);
`;

// zobaczymy
export const ProductsButton = styled.div``;
