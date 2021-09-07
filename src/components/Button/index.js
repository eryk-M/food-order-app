import React from 'react';
import styled from 'styled-components/macro';

const ButtonMain = styled.button`
	width: ${(props) => props.width};
	margin-left: ${(props) => props.marginleft};
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 1.4rem;
	background-color: var(--color-primary);
	color: var(--color-grey-light);
	border: none;
	cursor: pointer;
	transition: all 0.2s;
	margin-bottom: ${(props) => props.marginbottom};
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

const Button = (props) => {
	return <ButtonMain {...props}>{props.children}</ButtonMain>;
};

export default Button;
