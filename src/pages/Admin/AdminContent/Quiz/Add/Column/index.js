import React, { useState } from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { QuestionList, IconWrapper } from './ColumnElements';

import Question from 'components/Admin/Question';
import { DragIcon } from 'components/Admin/Icons';
const Column = ({ initialData, setInitialData, onDelete }) => {
	// const [state, setState] = useState(initialData);

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const column = initialData.columns[source.droppableId];
		const newQuestionsIds = Array.from(column.questionIds);
		newQuestionsIds.splice(source.index, 1);
		newQuestionsIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
			questionIds: newQuestionsIds,
		};

		const newState = {
			...initialData,
			columns: {
				...initialData.columns,
				[newColumn.id]: newColumn,
			},
		};

		setInitialData(newState);
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{initialData.columnOrder.map((columnId) => {
				const column = initialData.columns[columnId];
				const questions = column.questionIds.map(
					(questionId) => initialData.questions[questionId]
				);
				return (
					<Droppable key={columnId} droppableId={'column-1'}>
						{(provided, snapshot) => (
							<QuestionList
								{...provided.droppableProps}
								ref={provided.innerRef}
								isDraggingOver={snapshot.isDraggingOver}
							>
								<Question questions={questions} onDelete={onDelete} />
								{provided.placeholder}
								<IconWrapper>
									<DragIcon />
								</IconWrapper>
							</QuestionList>
						)}
					</Droppable>
				);
			})}
		</DragDropContext>
	);
};

export default Column;
