import styled from 'styled-components/macro';

export const QuestionContainer = styled.div`
	/* width: 80rem; */
	max-width: 60rem;
	margin: 0 auto;
	/* text-align: center; */
	display: block;
	/* background-color: green; */
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
	/* margin-top: 1rem; */
	font-size: 1.4rem;
	/* padding-left: 1rem; */
	padding: 0 0 1rem 0;
`;

export const QuestionItem = styled.li`
	margin-top: 1rem;
	/* background-color: ${(props) =>
		props.correct ? 'var(--color-green)' : '#93949417'}; */
	background-color: ${(props) => {
		if (props.userAnswer) return 'var(--color-red)';
		else if (props.correct) return 'var(--color-green)';
		else return '#93949417';
	}};
	color: ${(props) => {
		if (props.userAnswer || props.correct) return '#fff';
		else return '#000';
	}};
	padding: 1rem;
`;

export const QuestionWrapper = styled.div``;
