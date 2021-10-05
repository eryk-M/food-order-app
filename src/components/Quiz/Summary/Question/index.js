import React from 'react';

import {
	QuestionContainer,
	QuestionAnswer,
	QuestionList,
	QuestionItem,
	QuestionTitle,
	QuestionWrapper,
} from './QuestionElements';

const Question = ({ answer, question }) => {
	const { content, correct, incorrect } = question;
	return (
		<QuestionContainer>
			<QuestionAnswer>{content}</QuestionAnswer>
			<QuestionList>
				<QuestionTitle>Correct:</QuestionTitle>
				<QuestionItem correct>{correct.answer}</QuestionItem>
				{incorrect.map((el, i) => (
					<QuestionWrapper key={i}>
						{el.id === answer && (
							<QuestionTitle>Your answer</QuestionTitle>
						)}
						<QuestionItem userAnswer={el.id === answer}>
							{el.answer}
						</QuestionItem>
					</QuestionWrapper>
				))}
			</QuestionList>
		</QuestionContainer>
	);
};

export default Question;
