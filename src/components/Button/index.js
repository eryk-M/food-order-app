import React from 'react';
import styled from 'styled-components/macro';

const ButtonLink = styled.a`
	padding: 1.2rem 1rem;
	font-size: 1.2rem;
	min-width: 13rem;
	background-color: var(--color-secondary);
	text-align: center;
	color: var(--color-grey-light);
	line-height: 2.2rem;
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-tertiary);
		cursor: pointer;
		color: #000;
	}
`;

const Button = ({ children }) => {
	return <ButtonLink>{children}</ButtonLink>;
};

export default Button;
