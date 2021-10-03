import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const InfoIconWrapper = styled.div`
	padding: 1.4rem;
	background-color: #52b7ff;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const InfoNote = styled.div`
	display: inline-block;
	margin-left: 2rem;
	padding: 1rem 0;
	@media ${device.mobileM} {
		padding: 1rem 0.5rem;
	}
`;

export const InfoNoteHeading = styled.h3`
	font-size: 1.8rem;
	color: #52b7ff;
	font-family: 'Rubik', sans-serif;
	@media ${device.mobileM} {
		font-size: 1.4rem;
	}
`;

export const InfoP = styled.p`
	font-size: 1.6rem;
	line-height: 1.4;
	margin-top: 1rem;
	@media ${device.mobileM} {
		font-size: 1.2rem;
	}
`;
