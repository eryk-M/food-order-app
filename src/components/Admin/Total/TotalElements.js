import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const TotalLeft = styled.div`
	line-height: 1.7;
`;

export const TotalRight = styled.div``;

export const TotalH = styled.h3`
	font-size: 1.8rem;
	font-family: 'Rubik', sans-serif;
`;

export const TotalP = styled.p`
	@media ${device.mobileL} {
		text-align: center;
		font-size: 1.4rem;
	}
`;

export const TotalNumber = styled.span`
	display: block;
	font-size: 2.6rem;
	font-weight: bold;
	color: ${(props) => props.spanColor};

	@media only screen and (max-width: 1132px) {
		font-size: 2rem;
	}
`;
