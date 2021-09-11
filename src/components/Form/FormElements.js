import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';

import Loader from '../Loader';

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
	text-transform: uppercase;
	font-weight: bold;
`;

export const Form = styled.form`
	position: relative;
`;

export const FormElement = styled.div`
	margin-left: ${(props) => props.marginleft};
`;
export const FormGroup = styled.div`
	display: ${(props) => (props.flex ? 'flex' : '')};
`;
export const FormLabel = styled.label`
	font-size: 1.6rem;
`;

export const FormInput = styled.input`
	font-size: 1.6rem;
	margin-bottom: 1.5rem;
	margin-top: 1rem;
	padding: 1rem;
	width: 100%;
	display: block;
	border-radius: 0.5rem;
	border: ${(props) => {
		if (props.error) {
			return '1px solid var(--color-red)';
		}
		return '1px solid rgba(0, 0, 0, 0.5);';
	}};

	-moz-appearance: textfield;
	&::placeholder {
		opacity: 0.5;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const FormTextArea = styled.textarea`
	resize: none;
	padding: 1rem;
	height: 20rem;
	width: 100%;
	border-radius: 0.5rem;
	color: #666;
	outline: 0;
	font-size: 1.6rem;
`;

export const FormBtn = styled.button`
	border: none;
	font-size: 1.8rem;
	width: 100%;
	height: 4.5rem;
	background-color: ${(props) =>
		props.secondary
			? 'var(--color-secondary)'
			: 'var(--color-primary)'};
	color: ${(props) =>
		props.secondary
			? 'var(--color-grey-dark)'
			: 'var(--color-grey-light)'};
	/* margin: auto; */
	vertical-align: middle;
	cursor: pointer;
	margin-top: 1.5rem;
	/* position: relative; */
	display: flex;
	justify-content: center;
	align-items: center;
	&:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;

export const FormButton = ({ loading, type, text, ...rest }) => {
	return (
		<FormBtn
			className="form"
			{...rest}
			disabled={loading}
			type={type ?? 'submit'}
		>
			{loading ? <Loader /> : text}
		</FormBtn>
	);
};

export const FormLink = styled(Link)``;

export const FormAlternative = styled.div`
	margin-top: 2rem;
	font-size: 1.6rem;
	text-align: right;
`;

export const FormSpan = styled.span`
	display: block;
	font-size: 1.4rem;
	color: var(--color-red);
	margin-bottom: 1rem;
`;
