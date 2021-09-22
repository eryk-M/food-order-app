import styled from 'styled-components/macro';

export const MainContainer = styled.div`
	background-color: var(--color-white);
	padding: 1.5rem;
	border-radius: 5px;
	min-width: 80%;
	margin-right: 2rem;
	box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
	position: relative;
`;

export const EditContainer = styled.div`
	position: relative;
	background-color: var(--color-white);
	padding: 1.5rem;
	border-radius: 5px;
	max-width: 80rem;
	box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
	overflow: hidden;
`;

export const ProgressContainer = styled.div`
	margin: 1rem 0;
`;
