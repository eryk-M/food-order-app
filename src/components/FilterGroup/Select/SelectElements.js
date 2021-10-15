import styled from 'styled-components/macro';

export const SelectForm = styled.form``;

export const SelectContent = styled.select`
	font-size: 1.6rem;
	border: 1px solid #ccc;
	border-radius: 0.5rem;
	padding: 1rem;
	outline: none;
	font-family: 'Rubik', sans-serif;
	margin-bottom: 1.5rem;
	margin-top: 1rem;
	width: ${({ width }) => width ?? ''};
	display: ${({ display }) => display ?? ''};
	margin-left: ${({ marginleft }) => marginleft ?? ''};
`;

export const SelectOption = styled.option`
	&:hover {
		color: var(--color-primary);
	}
`;

export const SelectLabel = styled.label`
	display: block;
	font-size: 1.8rem;
	margin-right: 1rem;
`;
