import React, { useState } from 'react';

import { useLocation, useHistory } from 'react-router';

import {
	AnswerButton,
	AnswerContent,
	AnswerP,
	QuizContainer,
	AnswersContainer,
	QuizHeading,
	NextButton,
} from './QuizElements';

const data = {
	id: 'yAXiNglyUPS6oWNUjr4G',
	coupon: {
		discount: '10',
		fromPrice: '2',
		code: 'KUPON10',
	},
	questions: {
		'question-4': {
			id: 'question-4',
			content: 'Habibi 1?',
			correct: {
				id: 1,
				correct: true,
				answer: 'yes',
			},
			incorrect: [
				{
					correct: false,
					id: 2,
					answer: 'no',
				},
				{
					answer: 'no',
					id: 3,
					correct: false,
				},
				{
					id: 4,
					correct: false,
					answer: 'no',
				},
			],
		},
		'question-1': {
			correct: {
				answer: 'yes',
				id: 1,
				correct: true,
			},
			id: 'question-1',
			incorrect: [
				{
					correct: false,
					id: 2,
					answer: 'no',
				},
				{
					answer: 'no',
					id: 3,
					correct: false,
				},
				{
					id: 4,
					answer: 'no',
					correct: false,
				},
			],
			content: 'Habibi 2?',
		},
		'question-5': {
			id: 'question-5',
			incorrect: [
				{
					correct: false,
					id: 2,
					answer: 'no',
				},
				{
					answer: 'no',
					correct: false,
					id: 3,
				},
				{
					id: 4,
					answer: 'no',
					correct: false,
				},
			],
			correct: {
				correct: true,
				id: 1,
				answer: 'yes',
			},
			content: 'Habibi 3?',
		},
		'question-3': {
			id: 'question-3',
			correct: {
				correct: true,
				id: 1,
				answer: 'yes',
			},
			content: 'Habibi 4?',
			incorrect: [
				{
					id: 2,
					answer: 'no',
					correct: false,
				},
				{
					id: 3,
					correct: false,
					answer: 'no',
				},
				{
					answer: 'no',
					correct: false,
					id: 4,
				},
			],
		},
		'question-6': {
			content: 'Habibi 5?',
			correct: {
				id: 1,
				answer: 'yes',
				correct: true,
			},
			id: 'question-6',
			incorrect: [
				{
					id: 2,
					correct: false,
					answer: 'no',
				},
				{
					correct: false,
					answer: 'no',
					id: 3,
				},
				{
					id: 4,
					answer: 'no',
					correct: false,
				},
			],
		},
		'question-2': {
			incorrect: [
				{
					answer: 'no',
					correct: false,
					id: 2,
				},
				{
					correct: false,
					id: 3,
					answer: 'no',
				},
				{
					id: 4,
					correct: false,
					answer: 'no',
				},
			],
			content: 'Habibi 6?',
			correct: {
				correct: true,
				answer: 'yes',
				id: 1,
			},
			id: 'question-2',
		},
	},
	title: 'Habibi quiz',
};

const Quiz = (props) => {
	// const { data } = useLocation();
	const [question, setQuestion] = useState(
		data.questions[Object.keys(data.questions)[0]]
	);
	const history = useHistory();
	const mixAnswersUp = [...question.incorrect, question.correct].sort(
		() => Math.random() - 0.5
	);

	const [mixAnswers, setMixAnswers] = useState(mixAnswersUp);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showNextQuestion, setShowNextQuestion] = useState(false);
	const [quizSummary, setQuizSummary] = useState([]);
	const [showSummary, setShowSummary] = useState(false);

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
	const onHandleQuizSummary = () => {
		let question = Object.keys(data.questions)[questionNumber].slice(
			-1
		);

		let obj = {
			[`question-${question}`]: selectedAnswer,
			isCorrect: selectedAnswer === 1 ? true : false,
		};
		const finalAnswers = [...quizSummary, obj];

		history.push({
			pathname: `/user/quizes/${props.match.params.id}/summary`,
			data: finalAnswers,
		});
	};

	return (
		<QuizContainer>
			{data && <QuizHeading>{data.title}</QuizHeading>}
			{question && (
				<AnswerContent>
					<AnswerP>{question.content}</AnswerP>
				</AnswerContent>
			)}
			<AnswersContainer>
				{mixAnswers &&
					mixAnswers.map((el) => (
						<AnswerButton
							elementId={el.id}
							selectedAnswer={selectedAnswer}
							onClick={() => handleSelect(el.id)}
						>
							{el.answer}
						</AnswerButton>
					))}
			</AnswersContainer>
			{showNextQuestion && (
				<NextButton onClick={handleNextQuestion}>Next</NextButton>
			)}
			{showSummary && (
				<NextButton onClick={onHandleQuizSummary}>Summary</NextButton>
			)}
		</QuizContainer>
	);
};

export default Quiz;
