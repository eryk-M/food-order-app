import styled from 'styled-components/macro';

import quizBg from 'assets/images/quiz_bg.webp';

import { motion } from 'framer-motion';

export const QuizCard = styled(motion.div)`
	border: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	width: 15rem;
	@media (max-width: 844px) {
		width: unset;
	}
`;
export const QuizList = styled(motion.div)`
	display: ${({ items }) => (items?.length > 3 ? 'grid' : 'flex')};
	grid-template-columns: repeat(auto-fit, minmax(150px, 4fr));
	grid-gap: 2rem;
	margin: 0 1rem;
`;
export const QuizCardHeading = styled.h3`
	font-size: 1.6rem;
	padding: 1rem 2rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: center;
`;

export const QuizCardNote = styled.p`
	font-size: 1.7rem;
	margin: 2rem 0;
	text-align: center;
`;

export const QuizButton = styled.button`
	display: block;
	width: 100%;
	padding: 1rem;
	border: none;
	background: none;
	background-color: var(--color-primary);
	color: white;
	font-size: 1.8rem;
	transition: all 0.1s;
	margin-top: auto;
	&:hover {
		cursor: pointer;
		background-color: var(--color-secondary);
		color: black;
	}
`;

export const UserQuizContainer = styled.div`
	width: 100%;
	background: url(${quizBg});
	background-position: center;
	background-size: cover;
	padding-bottom: 3rem;
	overflow-y: scroll;
	height: 50rem;
`;

export const QuizUpperContent = styled(motion.div)`
	text-align: center;
	padding-top: 3rem;
`;

export const QuizHeading = styled.h2`
	font-size: 2.4rem;
	display: inline-block;
	margin-bottom: 3rem;
	color: #fff;
	background-color: var(--color-primary);
	padding: 1rem;
`;
export const QuizHint = styled.p`
	font-size: 1.4rem;
	max-width: 45rem;
	margin: 0 auto;
	color: #000;
	background-color: rgba(255, 255, 255, 0.5);
	padding: 1rem;
`;

export const QuizDownerContent = styled.div`
	display: flex;
	justify-content: center;
`;

export const QuizDownerHeading = styled(motion.h3)`
	font-size: 1.6rem;
	color: #fff;
	text-align: center;
	margin: 2rem 0;
	position: relative;
	display: inline-block;
	background-color: var(--color-primary);
	padding: 1rem;
`;
