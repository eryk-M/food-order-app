import styled from 'styled-components/macro';

export const QuestionList = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 1rem;
	min-height: 30rem;
	background-color: ${(props) =>
		props.isDraggingOver ? '#93949417' : 'white'};
	/* background-color: green; */
	position: relative;
`;

export const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	/* background-color: red; */
`;
