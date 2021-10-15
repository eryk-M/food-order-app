import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const TotalLeft = styled.div`
	line-height: 1.7;
`;

export const TotalRight = styled.div``;

export const TotalH = styled.h3`
	font-size: 1.8rem;
	font-family: 'Rubik', sans-serif;
	@media ${device.mobileL} {
		text-align: center;
	}
	@media ${device.mobileM} {
		text-align: left;
	}
`;

export const TotalP = styled.p`
	font-size: 1.4rem;
	@media ${device.mobileL} {
		text-align: center;
	}
`;

export const TotalNumber = styled.span`
	display: block;
	font-size: 2.6rem;
	font-weight: bold;
	color: ${({ spanColor }) => spanColor};

	@media only screen and (max-width: 1132px) {
		font-size: 2rem;
	}
`;
