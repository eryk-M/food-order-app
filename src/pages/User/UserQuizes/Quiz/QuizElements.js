import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import quizBg from 'assets/images/quiz_bg.webp';
import { device } from 'utils/breakpoints';

export const QuizContainer = styled.div`
	height: 100%;
	width: 100%;
	background: url(${quizBg});
	background-position: center;
	background-size: cover;
	position: relative;
`;

export const QuizContent = styled.div`
	max-width: 70%;
	margin: 0 auto;
	padding-top: 3rem;
	padding-bottom: 5rem;
	@media ${device.mobileM} {
		max-width: 90%;
	}
`;

export const QuizHeading = styled.h2`
	text-align: center;
	font-size: 2.4rem;
	margin-bottom: 2rem;
	color: #fff;
`;

export const AnswerContent = styled.div`
	padding: 2rem;
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
	word-break: break-all;
	white-space: normal;
	text-align: center;
`;

export const AnswersContainer = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	grid-gap: 3rem;
	margin-top: 2rem;
`;

export const AnswerButton = styled.button`
	font-size: 1.6rem;
	padding: 1rem;
	color: var(--color-black);
	background-color: ${({ elementId, selectedAnswer }) =>
		elementId === selectedAnswer ? '#b374ec' : '#fff'};
	color: ${({ elementId, selectedAnswer }) =>
		elementId === selectedAnswer ? '#fff' : '#000'};
	border: 2px solid #b374ec;
	border-radius: 5px;
	cursor: pointer;
	white-space: normal;
	word-wrap: break-word;
	&:disabled {
		opacity: 0.5;
	}
`;

export const NextButton = styled.button`
	margin-left: auto;
	display: block;
	width: 10rem;
	font-size: 1.6rem;
	padding: 1rem;
	margin-top: 1rem;
	background-color: var(--color-primary);
	text-transform: uppercase;
	color: #fff;
	border: none;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
	}
`;
