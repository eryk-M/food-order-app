import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import React from 'react';
import { getQuizes } from 'utils/firebaseGetters';
import { UserAccountHeading } from '../UserAccount/UserAccountElements';
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

const UserQuizes = () => {
	const { data } = useFirestoreQuery(getQuizes());
	const history = useHistory();
	const handleStartQuiz = (id, el) => {
		history.push({ pathname: `/user/quizes/${id}`, data: el });
	};
	console.log(data);
	return (
		<UserQuizContainer>
			<QuizUpperContent>
				<QuizHeading>Welcome to Quiz App</QuizHeading>
				<QuizHint>
					You have only one chance to participate in each quiz. You
					can win coupons which can be used for shopping. <br />
					<br />
					Coupons can be used only once.
				</QuizHint>
			</QuizUpperContent>
			<QuizDownerContent>
				<QuizDownerHeading>
					Available quizes for you
				</QuizDownerHeading>
			</QuizDownerContent>
			<QuizList>
				{data &&
					data.map((el, i) => (
						<QuizCard key={i}>
							<QuizCardHeading>{el.title}</QuizCardHeading>
							<QuizCardNote>
								{Object.keys(el.questions).length} questions
							</QuizCardNote>
							<QuizButton onClick={() => handleStartQuiz(el.id, el)}>
								Start quiz
							</QuizButton>
						</QuizCard>
					))}
				<QuizCard>
					<QuizCardHeading>Dummy</QuizCardHeading>
					<QuizCardNote>5 questions</QuizCardNote>
					<QuizButton>Start quiz</QuizButton>
				</QuizCard>
				<QuizCard>
					<QuizCardHeading>Dummy</QuizCardHeading>
					<QuizCardNote>5 questions</QuizCardNote>
					<QuizButton>Start quiz</QuizButton>
				</QuizCard>
				<QuizCard>
					<QuizCardHeading>Dummy</QuizCardHeading>
					<QuizCardNote>5 questions</QuizCardNote>
					<QuizButton>Start quiz</QuizButton>
				</QuizCard>
				<QuizCard>
					<QuizCardHeading>Dummy</QuizCardHeading>
					<QuizCardNote>5 questions</QuizCardNote>
					<QuizButton>Start quiz</QuizButton>
				</QuizCard>
				<QuizCard>
					<QuizCardHeading>Dummy</QuizCardHeading>
					<QuizCardNote>5 questions</QuizCardNote>
					<QuizButton>Start quiz</QuizButton>
				</QuizCard>
				<QuizCard>
					<QuizCardHeading>Dummy</QuizCardHeading>
					<QuizCardNote>5 questions</QuizCardNote>
					<QuizButton>Start quiz</QuizButton>
				</QuizCard>
				<QuizCard>
					<QuizCardHeading>Dummy</QuizCardHeading>
					<QuizCardNote>5 questions</QuizCardNote>
					<QuizButton>Start quiz</QuizButton>
				</QuizCard>
			</QuizList>
		</UserQuizContainer>
	);
};

export default UserQuizes;
