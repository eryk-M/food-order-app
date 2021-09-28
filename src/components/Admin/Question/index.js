import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { QuestionElement } from './QuestionElements';

const Question = ({ questions }) => {
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
							{el.content}
						</QuestionElement>
					)}
				</Draggable>
			))}
		</>
	);
};

export default Question;
