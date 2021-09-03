import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';

export const FormContainer = styled.div`
	min-width: 40%;

	@media screen and (max-width: 840px) {
		margin-top: 3rem;
		min-width: 60%;
	}
`;

export const FormAlert = styled.div`
	color: #842029;
	background-color: #f8d7da;
	border-color: #f5c2c7;
	position: relative;
	padding: 1rem 1rem;
	margin-bottom: 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
	font-size: 1.6rem;
`;

export const FormHeading = styled.h2`
	text-align: center;
	margin-bottom: 5rem;
	/* font-family: 'Rubik', sans-serif; */
	text-transform: uppercase;
	font-weight: bold;
`;

export const Form = styled.form``;

export const FormElement = styled.div``;

export const FormLabel = styled.label`
	margin-bottom: 1rem;
	font-weight: bold;
	font-size: 1.6rem;
`;

export const FormInput = styled.input`
	font-size: 1.6rem;
	margin-bottom: 1.5rem;
	padding: 1rem;
	width: 100%;
	display: block;

	&::placeholder {
		opacity: 0.5;
	}
`;

export const FormButton = styled.button`
	border: none;
	font-size: 1.8rem;
	width: 100%;
	margin-top: 1.5rem;
	padding: 1rem;
	background-color: var(--color-secondary);
	color: var(--color-grey-light);
	margin: auto;
	vertical-align: middle;
	/* position: relative; */
	&:disabled {
		opacity: 0.5;
	}
`;

export const FormLink = styled(Link)``;

export const FormAlternative = styled.div`
	margin-top: 2rem;
	font-size: 1.6rem;
	text-align: right;
`;
