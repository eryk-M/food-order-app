import React from 'react';
import styled from 'styled-components/macro';

const ButtonMain = styled.button`
	width: ${(props) => props.width};
	margin-left: ${(props) => props.marginLeft};
	padding: 1rem;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 1.4rem;
	background-color: var(--color-secondary);
	color: var(--color-grey-light);
	border: none;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-tertiary);
		color: var(--color-grey-dark);
	}
	&:disabled {
		opacity: 0.5;
		cursor: default;
		&:hover {
			background-color: var(--color-secondary);
			color: var(--color-grey-light);
		}
	}
`;

const Button = (props) => {
	return <ButtonMain {...props}>{props.children}</ButtonMain>;
};

export default Button;
