import styled from 'styled-components/macro';

export const QuizCard = styled.figure`
	border: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

export const QuizCardHeading = styled.h3`
	font-size: 2rem;
	padding: 1rem 2rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const QuizCardNote = styled.p`
	font-size: 1.7rem;
	margin: 2rem 0;
`;

export const QuizButton = styled.button`
	/* padding: 0 5rem; */
	display: block;
	width: 100%;
	padding: 1rem;
	border: none;
	background: none;
	background-color: var(--color-primary);
	color: white;
	font-size: 1.8rem;
	transition: all 0.1s;
	&:hover {
		cursor: pointer;
		background-color: var(--color-secondary);
		color: black;
	}
`;
