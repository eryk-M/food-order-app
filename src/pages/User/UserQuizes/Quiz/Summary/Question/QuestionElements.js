import styled from 'styled-components/macro';

export const QuestionContainer = styled.div`
	max-width: 60rem;
	margin: 0 auto;
	display: block;
	overflow: hidden;
	background-color: #f8f8f8;
	padding: 1rem;
`;
export const QuestionTitle = styled.span`
	font-size: 1.4rem;
	margin: 0.5rem 0;
	background-color: var(--color-purple-light);
	display: inline-block;
	color: #fff;
	padding: 0.5rem;
	border-radius: 5px;
`;

export const QuestionAnswer = styled.p`
	padding: 2rem;
	font-size: 1.8rem;
	border-radius: 5px;
	background-color: var(--color-purple-light);
	color: #fff;
	overflow: hidden;
	display: block;
	word-break: break-all;
	white-space: normal;
`;

export const QuestionList = styled.ul`
	font-size: 1.4rem;
	padding: 0 0 1rem 0;
`;

export const QuestionItem = styled.li`
	margin-top: 1rem;
	background-color: ${({ userAnswer, correct }) => {
		if (userAnswer) return 'var(--color-red)';
		else if (correct) return 'var(--color-green)';
		else return 'var(--color-background-grey-light)';
	}};
	color: ${({ userAnswer, correct }) => {
		if (userAnswer || correct) return '#fff';
		else return '#000';
	}};
	padding: 1rem;
`;

export const QuestionWrapper = styled.div``;
