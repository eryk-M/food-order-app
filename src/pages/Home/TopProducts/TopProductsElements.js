import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const TopProductsContainer = styled.section`
	max-width: 116rem;
	margin: 10rem auto;
	text-align: center;
	padding: 0 1rem;
`;

export const TopProductsWrapper = styled.div`
	display: flex;
	justify-content: ${({ loading }) =>
		loading === 'true' ? 'center' : 'space-between'};
	margin-top: 5rem;

	@media ${device.mobileL} {
		flex-direction: column;
		align-items: center;
	}
`;
