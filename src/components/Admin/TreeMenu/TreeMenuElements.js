import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

export const TreeP = styled.p`
	transition: all 0.1s ease-in-out;
`;

export const TreeItemMain = styled.li`
	display: block;
	font-size: 1.6rem;
	width: ${(props) =>
		props.hidden ? '5rem' : 'calc(25rem - 0.5rem * 2)'};
	padding: 1rem;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	& svg {
		font-size: 2.2rem;
		margin-right: ${(props) => (props.hidden ? '' : '1.2rem')};
	}

	&:hover {
		background-color: var(--color-primary);
	}
	& .icon-arrow {
		display: ${(props) => (props.hidden ? 'none' : 'block')};
		font-size: 2rem;
		margin-left: auto;
		margin-right: 0;
	}
	.is-active {
		background-color: var(--color-primary);
		& .icon-arrow {
			display: block;
			margin-left: auto;
			font-size: 2rem;
			transition: all 0.2s ease-in-out;
			margin-right: 0 !important;
		}
	}
`;

export const TreeNavLink = styled(NavLink)`
	display: block;
	font-size: 1.6rem;
	padding: 1.2rem 1.4rem;
	display: flex;
	align-items: center;
	transition: all 0.2s ease-in-out;
	& svg {
		font-size: 2.2rem;
		margin-right: ${(props) => (props.hidden ? '' : '1.2rem')};
	}
	&:hover {
		background-color: var(--color-primary);
	}
	& .icon-arrow {
		display: none;
		transition: all 0.2s ease-in-out;
		margin-right: 0;
	}
`;

export const Tree = styled.div`
	${TreeItemMain} {
		${(props) => {
			if (props.hidden) {
				return `
            width: 5rem;
            `;
			}
		}}
	}

	${TreeNavLink} {
		${(props) => {
			if (props.hidden) {
				return `
            font-size: 2.5rem;
            `;
			}
		}}
	}
`;

export const TreeList = styled.ul`
	width: 100%;
	background-color: #3e4a54;
`;

export const TreeItem = styled.li`
	margin: 0.1rem 0;
	&:not(:last-of-type) {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
`;
