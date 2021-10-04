import styled, { keyframes } from 'styled-components/macro';

import { Link } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

import Loader from '../Loader';

const fadeIn = keyframes`
from{
    opacity: 0%
}

to {
    opacity: 100%
}
`;

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
	& .search-icon {
		position: absolute;
		font-size: 1.8rem;
		top: 0;
		right: 1rem;
		transform: translateY(60%);
		opacity: 0.6;
	}
`;
export const FormGroup = styled.div`
	display: ${(props) => (props.flex ? 'flex' : '')};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin: ${(props) => props.margin};
`;
export const FormLabel = styled.label`
	font-size: 1.6rem;
`;

export const FormCheckbox = styled.input`
	margin-left: 1rem;
	font-size: 2.3rem;
`;

export const FormInput = styled.input`
	font-size: 1.6rem;
	margin-bottom: 1.5rem;
	margin-top: 1rem;
	padding: 1rem;
	width: ${(props) => props.width ?? '100%'};
	display: ${(props) => props.display ?? 'block'};
	border-radius: 0.5rem;
	transition: border 0.1s ease-in;
	border: ${(props) => {
		if (props.warning) {
			return '1px solid orange';
		} else if (props.error) {
			return '1px solid var(--color-red)';
		}
		return '1px solid #ccc;';
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
	height: ${(props) => props.height ?? '20rem'};
	width: 100%;
	border-radius: 0.5rem;
	color: #666;
	outline: 0;
	font-size: 1.6rem;
	margin-top: 1rem;
	margin-bottom: ${(props) => props.marginbottom};
	border: ${(props) =>
		props.error ? '1px solid var(--color-red)' : ''};
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
	vertical-align: middle;
	cursor: pointer;
	margin-top: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	transition: all 0.2s;
	&:disabled {
		opacity: 0.5;
		cursor: default;
	}

	${(props) =>
		props.button
			? 'letter-spacing: 1px;width: unset;font-size: 1.4rem;padding: 1rem;text-transform: uppercase;margin: 0;box-shadow: 0 0.2rem 1.5rem rgba(0, 0, 0, 0.2);border-radius: 5px;width:16rem;&:hover {background-color: var(--color-secondary);color: var(--color-grey-dark);}'
			: ''}
`;

export const FormButton = ({ loading, type, text, ...rest }) => {
	return (
		<FormBtn
			className="form"
			{...rest}
			disabled={loading}
			type={type ?? 'submit'}
		>
			{loading && <Loader />}
			{text}
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

export const FormErr = styled.p`
	font-size: 1.4rem;
	color: ${(props) =>
		props.warning ? 'orange' : 'var(--color-red)'};
	margin: 1rem 0;
	animation: ${fadeIn} 0.1s ease-in;
	opacity: 100%;
	display: ${(props) => props.display};
`;

export const FormErrIcon = styled(MdErrorOutline)`
	font-size: 2rem;
	vertical-align: middle;
	margin-right: 1rem;
`;

export const FormError = ({ children, ...rest }) => {
	return (
		<FormErr {...rest}>
			<FormErrIcon />
			{children}
		</FormErr>
	);
};
export const FormGroupWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	@media only screen and (max-width: 580px) {
		display: flex;
		flex-direction: column;
	}

	& ${FormInput} {
		@media only screen and (max-width: 580px) {
			max-width: 40rem;
		}
	}
`;
