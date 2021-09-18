import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

export const Tree = styled.li``;
export const TreeP = styled.p`
	transition: all 0.1s ease-in-out;
`;

export const TreeItemMain = styled.li`
	display: block;
	font-size: 1.6rem;
	width: calc(25rem - 0.5rem * 2);
	padding: 1rem;
	/* background-color: #d2404096; */
	border-radius: 5px;
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	& svg {
		font-size: 2.2rem;
		margin-right: 1.2rem;
	}
	&:hover {
		background-color: var(--color-primary);
	}
`;

export const TreeNavLink = styled(NavLink)`
	display: block;
	font-size: 1.6rem;
	width: calc(24rem - 0.5rem * 2);
	padding: 1rem;
	/* background-color: #d2404096; */
	border-radius: 5px;
	display: flex;
	align-items: center;
	transition: all 0.2s ease-in-out;
	& svg {
		font-size: 2.2rem;
		margin-right: 1.2rem;
	}
	&:hover {
		background-color: var(--color-primary);
	}
`;

export const TreeList = styled.ul`
	padding: 0 0.8rem;
	width: 100%;
`;

export const TreeItem = styled.li`
	margin: 0.1rem 0;
`;
