import React from 'react';
import styled from 'styled-components/macro';

const ButtonMain = styled.button`
	width: ${(props) => props.width};
	margin-left: ${(props) => props.marginleft};
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 1.4rem;
	background-color: ${(props) =>
		props.secondary ? '#fff' : 'var(--color-primary)'};
	color: ${(props) =>
		props.secondary ? '#000' : 'var(--color-grey-light)'};
	border: ${(props) =>
		props.secondary ? '1px solid var(--color-primary)' : 'none'};
	cursor: pointer;
	transition: all 0.2s;
	margin-bottom: ${(props) => props.marginbottom};
	border-radius: 5px;
	display: ${(props) => props.display ?? ''};
	&:hover {
		background-color: var(--color-secondary);
		color: var(--color-grey-dark);
	}
	&:disabled {
		opacity: 0.5;
		cursor: default;
		&:hover {
			background-color: var(--color-primary);
			color: var(--color-grey-light);
		}
	}
	@media screen and (max-width: 570px) {
		margin-bottom: 0;
	}
`;

const Button = ({ children, ...rest }) => {
	return <ButtonMain {...rest}>{children}</ButtonMain>;
};

export default Button;
