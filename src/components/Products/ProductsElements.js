import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const ProductsContainer = styled.div`
	max-width: 120rem;
	padding: 2rem;
	margin: 0 auto;
	min-height: 100rem;
	@media ${device.mobileL} {
		padding: 0;
	}
`;

export const ProductsSearchWrapper = styled.div`
	display: flex;
	width: 100%;

	@media ${device.mobileL} {
		flex-direction: column;
		margin: 0 auto;
	}
`;

export const SearchContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 98%;
	align-items: center;
	margin: 0 auto;
	margin-top: 2rem;
`;
