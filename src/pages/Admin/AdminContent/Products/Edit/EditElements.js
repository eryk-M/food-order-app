import styled from 'styled-components/macro';

import { Button } from 'components';

export const EditImage = styled.img`
	height: 15rem;
	width: 15rem;
	object-fit: cover;
	margin: 2rem auto;
	display: block;
	border: 1px solid rgba(0, 0, 0, 0.4);
`;

export const EditImageWrapper = styled.div`
	height: 15rem;
	width: 15rem;
	margin: 0 auto;
`;

export const IngredientList = styled.ul`
	font-size: 1.5rem;
	line-height: 1.5;
	list-style: circle;
`;

export const IngredientItem = styled.li`
	margin-top: 0.5rem;
	margin-left: 2rem;
`;

export const EditButton = styled(Button)`
	background-color: var(--color-secondary);
	border: none;
`;
