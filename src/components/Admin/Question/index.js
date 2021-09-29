import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import {
	QuestionElement,
	QuestionAswers,
	QuestionAnswerP,
} from './QuestionElements';
import {
	CrossDeleteIcon,
	DragLinesIcon,
} from 'components/Admin/Icons';
const Question = ({ questions, onDelete }) => {
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
									<QuestionAnswerP>- {el.answer}</QuestionAnswerP>
								))}
							</QuestionAswers>
						</QuestionElement>
					)}
				</Draggable>
			))}
		</>
	);
};

export default Question;
