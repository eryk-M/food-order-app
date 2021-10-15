import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const PriceFilterContainer = styled.div`
	margin-bottom: 3rem;
	width: 20rem;

	@media ${device.mobileL} {
		margin: 0 auto;
		width: 70%;
	}
`;

export const PriceFilterSpan = styled.span`
	font-size: ${({ size }) => size + 'rem'};
	display: block;
	font-weight: 100;
	margin: 1rem 0;
	text-align: center;
`;
