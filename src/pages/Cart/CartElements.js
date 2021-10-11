import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const CartWrapper = styled.div`
	max-width: 136rem;
	margin: 0 auto;
	padding: 2rem;
	@media ${device.mobileL} {
		padding: 0;
		padding-top: 2rem;
	}
`;

export const CartContainer = styled.div`
	font-family: 'Rubik';
	max-width: 100rem;
	margin: 4rem auto;
`;
