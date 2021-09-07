import React from 'react';
import styled from 'styled-components/macro';

const ButtonAnchor = styled.a`
	padding: 1.2rem 1rem;
	font-size: 1.2rem;
	min-width: 13rem;
	background-color: var(--color-primary);
	text-align: center;
	color: var(--color-grey-light);
	line-height: 2.2rem;
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-secondary);
		cursor: pointer;
		color: #000;
	}
`;

const ButtonLink = ({ children }) => {
	return <ButtonAnchor>{children}</ButtonAnchor>;
};

export default ButtonLink;
