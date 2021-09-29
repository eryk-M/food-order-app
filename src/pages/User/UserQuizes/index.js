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
} from './UserQuizesElements';

const UserQuizes = () => {
	const { data } = useFirestoreQuery(getQuizes());
	const history = useHistory();

	const handleStartQuiz = (id, el) => {
		history.push({ pathname: `/user/quizes/${id}`, data: el });
	};
	console.log(data);
	return (
		<>
			<UserAccountHeading>Available quizes</UserAccountHeading>
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
		</>
	);
};

export default UserQuizes;
