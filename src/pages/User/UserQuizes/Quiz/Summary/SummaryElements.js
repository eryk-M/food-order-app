import styled from 'styled-components/macro';

export const SummaryContainer = styled.div`
	margin: 2rem 0;
	overflow-y: scroll;
	height: 50rem;
`;

export const SummaryHeading = styled.h2`
	text-align: center;
	font-size: 3.2rem;
	line-height: 1.8;
`;

export const SummaryWinner = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin: 2rem auto;
	align-items: center;
`;

export const SummaryNote = styled.p`
	text-align: center;
	font-size: 2.5rem;
	display: block;
	margin-bottom: 2rem;
	& span {
		display: block;
		margin-top: 0.5rem;
		font-size: 1.8rem;
	}
`;
