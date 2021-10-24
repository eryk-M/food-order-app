import React from 'react';

import {
	QuestionElement,
	QuestionAswers,
	QuestionAnswerP,
} from './QuestionElements';
import { CrossDeleteIcon, DragLinesIcon } from 'components';

import loadable from '@loadable/component';
const Draggable = loadable(() =>
	import('react-beautiful-dnd').then((module) => module.Draggable)
);

export const Question = ({ questions, onDelete }) => {
	return (
		<>
			{questions.map((el, i) => (
				<Draggable key={el.id} draggableId={el.id} index={i}>
					{(provided, snapshot) => (
						<QuestionElement
							key={el.id}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
							isDragging={snapshot.isDragging}
						>
							<QuestionAnswerP>
								<DragLinesIcon />
								Q: {el.content}
							</QuestionAnswerP>
							<CrossDeleteIcon onClick={() => onDelete(el.id)} />
							<QuestionAswers>
								<QuestionAnswerP correct>
									- {el.correct.answer}
								</QuestionAnswerP>
								{el.incorrect.map((el) => (
									<QuestionAnswerP key={el.id}>
										- {el.answer}
									</QuestionAnswerP>
								))}
							</QuestionAswers>
						</QuestionElement>
					)}
				</Draggable>
			))}
		</>
	);
};
