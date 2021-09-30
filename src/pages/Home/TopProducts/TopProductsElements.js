import styled from 'styled-components/macro';

export const TopProductsContainer = styled.section`
	max-width: 116rem;
	margin: 10rem auto;
	text-align: center;
	padding: 0 1rem;
`;

export const TopProductsWrapper = styled.div`
	display: flex;
	justify-content: ${(props) =>
		props.loading === 'true' ? 'center' : 'space-between'};
	margin-top: 5rem;
`;
