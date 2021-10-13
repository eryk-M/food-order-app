import { useFirestoreQuery } from 'hooks';
import React from 'react';
import { getQuizes } from 'utils/firebaseGetters';
import { useHistory } from 'react-router';
import {
	QuizCard,
	QuizButton,
	QuizCardNote,
	QuizCardHeading,
	UserQuizContainer,
	QuizUpperContent,
	QuizHeading,
	QuizHint,
	QuizDownerContent,
	QuizDownerHeading,
	QuizList,
} from './UserQuizesElements';

export const UserQuizes = ({ userData }) => {
	const { data } = useFirestoreQuery(getQuizes());
	const history = useHistory();
	const handleStartQuiz = (id, el) => {
		history.push({ pathname: `/user/quizes/${id}`, data: el });
	};
	const checkAvailableQuizes = () => {
		return data.filter(
			({ id: id1 }) =>
				!userData.quizes.some(({ id: id2 }) => id2 === id1)
		);
	};

	// FRAMER-MOTION //
	const containerAndHeading = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		},
	};
	const list = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.5,
			},
		},
	};
	const item = {
		hidden: {
			opacity: 0,
			y: 50,
		},
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.2,
				ease: 'easeInOut',
			},
		},
	};
	return (
		<UserQuizContainer>
			<QuizUpperContent
				variants={containerAndHeading}
				initial="hidden"
				animate="show"
			>
				<QuizHeading>Welcome to Quiz App</QuizHeading>
				<QuizHint>
					You have only one chance to participate in each quiz{' '}
					<strong>(besides sample quiz)</strong>. You can win coupons
					which can be used for shopping. <br />
					<br />
					Coupons can be used only once.
				</QuizHint>
			</QuizUpperContent>
			<QuizDownerContent>
				<QuizDownerHeading
					variants={containerAndHeading}
					initial="hidden"
					animate="show"
				>
					{data && userData && checkAvailableQuizes().length === 0
						? "There isn't any available quiz for now"
						: 'Available quizzes for you'}
				</QuizDownerHeading>
			</QuizDownerContent>
			<QuizList
				variants={list}
				initial="hidden"
				animate={
					data &&
					userData &&
					checkAvailableQuizes().length > 0 &&
					'show'
				}
				items={data && userData && checkAvailableQuizes()}
			>
				{data &&
					userData &&
					checkAvailableQuizes().map((el, i) => (
						<QuizCard
							variants={item}
							items={checkAvailableQuizes()}
							key={i}
						>
							<QuizCardHeading>{el.title}</QuizCardHeading>
							<QuizCardNote>
								{Object.keys(el.questions).length} questions
							</QuizCardNote>
							<QuizButton onClick={() => handleStartQuiz(el.id, el)}>
								Start quiz
							</QuizButton>
						</QuizCard>
					))}
			</QuizList>
		</UserQuizContainer>
	);
};
