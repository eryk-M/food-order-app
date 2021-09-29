import styled from 'styled-components/macro';

export const QuestionElement = styled.div`
	font-size: 1.5rem;
	/* padding: 1rem; */
	padding-top: 1rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin-top: 1rem;
	background-color: white;
	transition: background-color 0.2s;
	z-index: 3;
	position: relative;
	border: 2px solid
		${(props) => (props.isDragging ? 'lightgreen' : 'rgba(0,0,0,.1)')};
`;

export const QuestionAswers = styled.div`
	margin-top: 1rem;
`;

export const QuestionAnswerP = styled.p`
	line-height: 1.7;
	background-color: ${(props) =>
		props.correct ? 'var(--color-green)' : 'white'};
	padding: 0.5rem 1rem;
`;
