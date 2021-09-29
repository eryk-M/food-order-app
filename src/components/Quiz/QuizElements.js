import styled from 'styled-components/macro';

export const QuizContainer = styled.div`
	min-width: 60rem;
	/* width: 100%; */
	margin: 0 auto;
`;

export const QuizHeading = styled.h2`
	text-align: center;
	font-size: 2.4rem;
	margin-bottom: 2rem;
`;

export const AnswerContent = styled.div`
	padding: 2rem;
	/* text-align: center; */
	background-color: #b374ec;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 15rem;
	color: #fff;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
`;

export const AnswerP = styled.p`
	font-size: 1.8rem;
`;

export const AnswersContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	grid-gap: 3rem;
	margin-top: 2rem;
`;

export const AnswerButton = styled.button`
	font-size: 2rem;
	padding: 1rem;
	color: var(--color-black);
	background-color: ${(props) =>
		props.elementId === props.selectedAnswer ? '#b374ec' : '#fff'};
	color: ${(props) =>
		props.elementId === props.selectedAnswer ? '#fff' : '#000'};
	/* background-color: #fff; */
	border: 2px solid #b374ec;
	border-radius: 5px;
	cursor: pointer;
`;

export const NextButton = styled.button`
	margin-left: auto;
	display: inline-block;
`;
