import styled from 'styled-components/macro';

import { device } from 'utils/breakpoints';

export const TrackerDetailsContainer = styled.section`
	max-width: 110rem;
	margin: 0 auto;
	padding: 0 2rem;
`;

export const TrackerDetailsRefresh = styled.p`
	font-size: 1.6rem;
	margin-top: 2rem;
	@media (max-width: 360px) {
		font-size: 1.3rem;
	}
`;

export const TrackerDetailsContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 8rem;
	border: 1px solid #e7272d38;
	width: 90%;
	margin: 8rem auto 5rem auto;
	padding: 5rem 0;
	border-radius: 2rem;
`;

export const TrackerDetailsHeading = styled.h2`
	font-weight: 400;
	font-size: 3.2rem;
	font-family: 'Rubik', sans-serif;
	@media ${device.mobileM} {
		font-size: 2.6rem;
	}
	@media (max-width: 360px) {
		font-size: 2rem;
	}
`;

export const TrackerDetailsNote = styled.p`
	font-weight: bold;
	font-size: 3.2rem;
	margin-top: 2rem;
	@media ${device.mobileM} {
		font-size: 2.6rem;
	}
	@media (max-width: 360px) {
		font-size: 2rem;
	}
`;

export const TrackerDetailsSummary = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	max-width: 90rem;
	padding: 0 1.5rem;
`;

export const TrackerDetailsSummaryItem = styled.div``;

export const TrackerDetailsSummaryHeading = styled.h3`
	font-size: 1.6rem;
	font-family: 'Rubik', sans-serif;
	margin-bottom: 1.5rem;
`;

export const TrackerDetailsSummaryDesc = styled.p`
	line-height: 1.5;
	font-size: 1.5rem;
`;

export const TrackerDetailsSummaryContainer = styled.div`
	margin-top: 8rem;
	background-color: var(--color-background-grey-light);
	padding: 5rem 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const StepsContainer = styled.div`
	@media ${device.mobileL} {
		display: flex;
		justify-content: center;
	}
`;
