import React, { useState } from 'react';

import { MainContainer } from 'components/Admin/Containers';
import { AdminPanelHeading } from 'components/Typography';

import Column from './Column';

import {
	Form,
	FormLabel,
	FormElement,
	FormInput,
	FormButton,
	FormCheckbox,
	FormGroup,
} from 'components/Form/FormElements';

import {
	ContentWrapper,
	ContentFormWrapper,
	ContentColumnWrapper,
} from './AddElements';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const data = {
	questions: {
		'question-1': { id: 'question-1', content: 'First question' },
		'question-2': { id: 'question-2', content: 'Second question' },
		'question-3': { id: 'question-3', content: 'Third question' },
		'question-4': { id: 'question-4', content: 'Fourth question' },
		'question-5': { id: 'question-5', content: 'Fifth question' },
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Questions list',
			questionIds: [
				'question-1',
				'question-2',
				'question-3',
				'question-4',
				'question-5',
			],
		},
	},
	columnOrder: ['column-1'],
};
const Add = () => {
	const [initialData, setInitialData] = useState(data);

	const validationSchema = Yup.object().shape({});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ resolver: yupResolver(validationSchema) });

	const onSubmit = (data) => {
		const id = initialData.columns['column-1'].questionIds.length + 1;
		console.log(data);
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
	};
	return (
		<MainContainer>
			<AdminPanelHeading>Add QUIZ</AdminPanelHeading>
			<ContentWrapper>
				<ContentFormWrapper>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormElement>
							<FormLabel>Add question</FormLabel>
							<FormInput {...register('question')} type="text" />
						</FormElement>
						<FormElement>
							<FormLabel>Correct answer</FormLabel>
							<FormInput {...register('correct')} type="text" />
						</FormElement>
						<FormElement>
							<FormLabel>Add answer 2</FormLabel>
							<FormInput {...register('incorrect.0')} type="text" />
						</FormElement>
						<FormElement>
							<FormLabel>Add answer 3</FormLabel>
							<FormInput {...register('incorrect.1')} type="text" />
						</FormElement>
						<FormElement>
							<FormLabel>Add answer 4</FormLabel>
							<FormInput {...register('incorrect.2')} type="text" />
						</FormElement>
						<FormButton text="Add" />
					</Form>
				</ContentFormWrapper>

				<ContentColumnWrapper>
					<Column
						initialData={initialData}
						setInitialData={setInitialData}
					/>
				</ContentColumnWrapper>
			</ContentWrapper>
		</MainContainer>
	);
};

export default Add;
