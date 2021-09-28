import styled from 'styled-components/macro';

export const QuestionElement = styled.p`
	font-size: 1.5rem;
	padding: 1rem;
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin-top: 1rem;
	background-color: ${(props) =>
		props.isDragging ? 'lightgreen' : 'white'};
	transition: background-color 0.2s;
`;
