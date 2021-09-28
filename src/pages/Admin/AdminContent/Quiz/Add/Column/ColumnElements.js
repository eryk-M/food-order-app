import styled from 'styled-components/macro';

export const QuestionList = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 1rem;
	background-color: ${(props) =>
		props.isDraggingOver ? '#93949417' : 'white'};
`;
