import React from 'react';
import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';

const ButtonAnchor = styled(Link)`
	padding: 1.2rem 1rem;
	font-size: ${(props) => props.font ?? '1.2rem'};
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

const ButtonLink = ({ children, ...rest }) => {
	return <ButtonAnchor {...rest}>{children}</ButtonAnchor>;
};

export default ButtonLink;
