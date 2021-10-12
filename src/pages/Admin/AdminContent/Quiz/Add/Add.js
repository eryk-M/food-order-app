import React, { useState, useRef } from 'react';

import { AdminQuizAddColumn } from 'pages';

import {
	Form,
	FormLabel,
	FormElement,
	FormInput,
	FormButton,
	FormGroup,
	FormTextArea,
	FormError,
	Discount,
	AdminPanelHeading,
} from 'components';

import {
	ContentWrapper,
	ContentFormWrapper,
	ContentColumnWrapper,
	ContentHeading,
	AddQuizContainer,
} from './AddElements';

import { useApi } from 'contexts';
import { useHistory } from 'react-router';
//FORM
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchema';
import { validationDiscount } from './validationDiscount';
import { yupResolver } from '@hookform/resolvers/yup';

const data = {
	questions: {},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Questions list',
			questionIds: [],
		},
	},
	columnOrder: ['column-1'],
};
const Add = () => {
	const [initialData, setInitialData] = useState(data);
	const [isLoading, setIsLoading] = useState(false);
	const { addQuiz, addCoupon } = useApi();
	const history = useHistory();

	const quizContainerRef = useRef();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		clearErrors,
	} = useForm({ resolver: yupResolver(validationSchema) });

	const {
		register: registerDiscount,
		handleSubmit: handleSubmitDiscount,
		formState: { errors: errorsDiscount },
		setError,
	} = useForm({ resolver: yupResolver(validationDiscount) });

	const textArea = watch('question');

	const onSubmit = (data) => {
		if (initialData.columns['column-1'].questionIds.length === 10) {
			reset();
			return alert('You cant add more questions. 10 is maximum');
		}
		const id = initialData.columns['column-1'].questionIds.length + 1;
		setInitialData((prevState) => {
			return {
				...prevState,
				columns: {
					...prevState.columns,
					'column-1': {
						...prevState.columns['column-1'],
						questionIds: [
							...prevState.columns['column-1'].questionIds,
							`question-${id}`,
						],
					},
				},
				questions: {
					...prevState.questions,
					[`question-${id}`]: {
						id: `question-${id}`,
						content: data.question,
						incorrect: [
							{ answer: data.incorrect[0], id: 2, correct: false },
							{ answer: data.incorrect[1], id: 3, correct: false },
							{ answer: data.incorrect[2], id: 4, correct: false },
						],
						correct: { answer: data.correct, id: 1, correct: true },
					},
				},
			};
		});
		reset();
		clearErrors();
	};
	const onDelete = (id) => {
		const clonedQuestions = initialData.questions;
		delete clonedQuestions[`${id}`];
		let questions = initialData.columns[
			'column-1'
		].questionIds.filter((el) => el !== id);
		setInitialData((prevState) => {
			return {
				...prevState,
				columns: {
					...prevState.columns,
					'column-1': {
						...prevState.columns['column-1'],
						questionIds: questions,
					},
				},
				questions: { ...clonedQuestions },
			};
		});
	};

	const onSubmitDiscount = async (data) => {
		if (
			Object.keys(initialData.questions).length >= 5 &&
			Object.keys(initialData.questions).length <= 10
		) {
			try {
				setIsLoading(true);
				await addQuiz(initialData.questions, data);

				await addCoupon(
					data.code,
					data.discount,
					data.fromPrice,
					true
				);
				history.push('/admin/quiz');
			} catch (error) {
				console.error(error);
			}
		} else {
			setError('questions', {
				message: 'Minimum 5 questions and maximum of 10',
			});
		}
	};

	return (
		<AddQuizContainer
			ref={quizContainerRef}
			maxwidth="80rem"
			minwidth="1rem"
			center
		>
			<AdminPanelHeading>Add QUIZ</AdminPanelHeading>
			<ContentWrapper>
				<ContentFormWrapper>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<ContentHeading>1. Add questions</ContentHeading>
						<FormElement>
							<FormLabel>Question</FormLabel>
							<span
								style={{
									marginLeft: '1rem',
									display: 'inline-block',
								}}
							>
								{(textArea && textArea.length) || 0} / 300
							</span>
							<FormTextArea
								height="10rem"
								marginbottom=".5rem"
								{...register('question')}
								type="text"
								error={errors.question}
							/>
							{errors.question && (
								<FormError>{errors.question.message}</FormError>
							)}
						</FormElement>
						<FormGroup flex justify="space-evenly">
							<FormElement>
								<FormLabel
									style={{
										padding: '0.5rem',
										backgroundColor: 'lightgreen',
									}}
								>
									Correct answer
								</FormLabel>
								<FormInput
									{...register('correct')}
									type="text"
									error={errors.correct}
								/>
								{errors.correct && (
									<FormError>{errors.correct.message}</FormError>
								)}
							</FormElement>
							<FormElement marginleft="2rem">
								<FormLabel>Answer 2</FormLabel>
								<FormInput
									{...register('incorrect.0')}
									type="text"
									error={
										errors.incorrect ? errors.incorrect[0] : false
									}
								/>
								{errors.incorrect && errors.incorrect[0] && (
									<FormError>{errors.incorrect[0].message}</FormError>
								)}
							</FormElement>
						</FormGroup>
						<FormGroup flex justify="space-evenly">
							<FormElement flex>
								<FormLabel>Answer 3</FormLabel>
								<FormInput
									{...register('incorrect.1')}
									type="text"
									error={
										errors.incorrect ? errors.incorrect[1] : false
									}
								/>
								{errors.incorrect && errors.incorrect[1] && (
									<FormError>{errors.incorrect[1].message}</FormError>
								)}
							</FormElement>
							<FormElement marginleft="2rem">
								<FormLabel>Answer 4</FormLabel>
								<FormInput
									{...register('incorrect.2')}
									type="text"
									error={
										errors.incorrect ? errors.incorrect[2] : false
									}
								/>
								{errors.incorrect && errors.incorrect[2] && (
									<FormError>{errors.incorrect[2].message}</FormError>
								)}
							</FormElement>
						</FormGroup>
						<FormGroup flex justify="center">
							<FormButton button type="submit" text="Add" />
						</FormGroup>
					</Form>
				</ContentFormWrapper>

				<ContentColumnWrapper>
					<ContentHeading>
						2. Reorganise order with drag & drop question if needed
					</ContentHeading>
					<span
						style={{
							marginLeft: '1rem',
							display: 'block',
							fontSize: '1.4rem',
						}}
					>
						{Object.keys(initialData.questions).length} / 10
					</span>
					<AdminQuizAddColumn
						initialData={initialData}
						setInitialData={setInitialData}
						onDelete={onDelete}
					/>
					{errorsDiscount.questions && (
						<FormError>{errorsDiscount.questions.message}</FormError>
					)}
				</ContentColumnWrapper>
				<ContentColumnWrapper>
					<ContentHeading>
						3. Add quiz title, prize coupon and submit quiz. Coupon
						can be used only once per user.
					</ContentHeading>
					<Form onSubmit={handleSubmitDiscount(onSubmitDiscount)}>
						<FormLabel>Short title</FormLabel>
						<FormInput
							loading={String(isLoading)}
							error={errorsDiscount.title}
							{...registerDiscount('title')}
						/>
						{errorsDiscount.title && (
							<FormError>{errorsDiscount.title.message}</FormError>
						)}
						<Discount
							isLoading={isLoading}
							register={registerDiscount}
							errors={errorsDiscount}
						/>
						<FormButton loading={isLoading} text="Submit" />
					</Form>
				</ContentColumnWrapper>
			</ContentWrapper>
		</AddQuizContainer>
	);
};

export default Add;
