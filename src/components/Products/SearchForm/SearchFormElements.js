import styled from 'styled-components/macro';

export const SearchFormContainer = styled.div`
	padding-bottom: 1rem;
	/* margin-bottom: 5rem; */
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	/* margin-top: 2rem; */
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const SearchFormForm = styled.form`
	/* margin-left: 2rem; */
`;

export const SearchFormSelect = styled.select`
	font-size: 1.6rem;
	border: 1px solid #ccc;
	border-radius: 0.5rem;
	padding: 1rem;
	outline: none;
	font-family: 'Rubik', sans-serif;
`;

export const SearchFormOption = styled.option`
	&:hover {
		color: var(--color-primary);
	}
`;

export const SearchFormLabel = styled.label`
	font-size: 1.8rem;
	margin-right: 1rem;
`;
