import React, { useState } from 'react';

import { useLocation, useHistory, Redirect } from 'react-router';

import {
	AnswerButton,
	AnswerContent,
	AnswerP,
	QuizContainer,
	AnswersContainer,
	QuizHeading,
	NextButton,
	QuizContent,
} from './QuizElements';
import { useAuth, useApi } from 'contexts';
import { Loader } from 'components';
import { LoaderWrapper } from 'pages/Admin/AdminContent/Orders/Order/OrderElements';

export const Quiz = (props) => {
	const { data } = useLocation();
	const { addQuizAndCouponToUser } = useApi();
	const [question, setQuestion] = useState(
		data?.questions[Object.keys(data.questions)[0]]
	);

	const history = useHistory();
	let mixAnswersUp;
	if (data) {
		mixAnswersUp = [...question?.incorrect, question?.correct].sort(
			() => Math.random() - 0.5
		);
	}
	const { currentUser } = useAuth();
	const [mixAnswers, setMixAnswers] = useState(mixAnswersUp);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showNextQuestion, setShowNextQuestion] = useState(false);
	const [quizSummary, setQuizSummary] = useState([]);
	const [showSummary, setShowSummary] = useState(false);
	const [loading, setLoading] = useState(false);

	if (!data) return <Redirect to="/user/quizes" />;

	const getNextItem = (key, i) => {
		let keys = Object.keys(data.questions).sort((a, b) => a - b);
		let index = keys.indexOf(key);
		if (
			(i === -1 && index > 0) ||
			(i === 1 && index < keys.length - 1)
		) {
			index = index + i;
		}
		return data.questions[keys[index]];
	};

	const handleSelect = (id) => {
		setSelectedAnswer(id);
		if (
			Object.keys(data.questions)[questionNumber] ===
			data.questions[
				Object.keys(data.questions)[
					Object.keys(data.questions).length - 1
				]
			].id
		) {
			return setShowSummary(true);
		}

		setShowNextQuestion(true);
	};

	const handleNextQuestion = () => {
		setQuizSummary((prevState) => {
			let question = Object.keys(data.questions)[
				questionNumber
			].slice(-1);

			let obj = {
				[`question-${question}`]: selectedAnswer,
				isCorrect: selectedAnswer === 1 ? true : false,
			};
			let arrayOfAnswers = [...prevState, obj];
			return arrayOfAnswers;
		});
		setMixAnswers(mixAnswersUp);
		setSelectedAnswer(null);
		setQuestion(
			getNextItem(Object.keys(data.questions)[questionNumber], +1)
		);
		setShowNextQuestion(false);
		setQuestionNumber((prevState) => prevState + 1);
	};
	const onHandleQuizSummary = async () => {
		setLoading(true);
		let question = Object.keys(data.questions)[questionNumber].slice(
			-1
		);

		let obj = {
			[`question-${question}`]: selectedAnswer,
			isCorrect: selectedAnswer === 1 ? true : false,
		};
		const finalAnswers = [...quizSummary, obj];
		const score = finalAnswers.filter((el) => el.isCorrect).length;
		const minimumScore =
			finalAnswers.length - finalAnswers.length * 0.2;
		try {
			if (data.coupon.code !== 'SAMPLE10') {
				await addQuizAndCouponToUser(
					currentUser.uid,
					props.match.params.id,
					data.coupon,
					score >= minimumScore
				);
			}

			history.push({
				pathname: `/user/quizes/${props.match.params.id}/summary`,
				data: finalAnswers,
				questions: data,
				score: score,
				minimumScore: minimumScore,
			});
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};

	return (
		<QuizContainer>
			{loading && (
				<LoaderWrapper top="1rem" right="1rem">
					<Loader primary />
				</LoaderWrapper>
			)}
			<QuizContent>
				{data && <QuizHeading>{data.title}</QuizHeading>}
				{question && (
					<AnswerContent>
						<AnswerP>{question.content}</AnswerP>
					</AnswerContent>
				)}
				<AnswersContainer>
					{mixAnswers &&
						mixAnswers.map((el, i) => (
							<AnswerButton
								key={el.id}
								elementId={el.id}
								selectedAnswer={selectedAnswer}
								onClick={() => handleSelect(el.id)}
							>
								{el.answer}
							</AnswerButton>
						))}
				</AnswersContainer>
				{showNextQuestion && (
					<NextButton disabled={loading} onClick={handleNextQuestion}>
						Next
					</NextButton>
				)}

				{showSummary && (
					<NextButton
						disabled={loading}
						onClick={onHandleQuizSummary}
					>
						Summary
					</NextButton>
				)}
			</QuizContent>
		</QuizContainer>
	);
};
