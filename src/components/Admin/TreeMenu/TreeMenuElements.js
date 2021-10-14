import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

import { device } from 'utils/breakpoints';
import { SideBarLinkTooltip } from 'pages/Admin/SideBar/SideBarElements';
export const TreeP = styled.p`
	/* transition: all 0.1s ease-in-out; */
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
	position: relative;
	@media ${device.mobileM} {
		font-size: 1.8rem;
	}
	& svg {
		font-size: 2.2rem;
		margin-right: ${(props) => (props.hidden ? '' : '1.2rem')};
	}

	&:hover {
		background-color: var(--color-primary);
		@media ${device.laptopS} {
			background-color: transparent;
		}
	}
	& .icon-arrow {
		display: ${(props) => (props.hidden ? 'none' : 'block')};
		font-size: 2rem;
		margin-left: auto;
		margin-right: 0;
	}
	.is-active {
		background-color: var(--color-primary) !important;
		& .icon-arrow {
			display: block;
			margin-left: auto;
			font-size: 2rem;
			transition: all 0.2s ease-in-out;
			margin-right: 0 !important;
		}
	}
	&:hover > ${SideBarLinkTooltip} {
		@media (min-width: 1025px) {
			visibility: visible;
			opacity: 1;
		}
	}
`;

export const TreeNavLink = styled(NavLink)`
	display: block;
	font-size: 1.6rem;
	padding: 1.2rem 1.4rem;
	display: flex;
	align-items: center;
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
	&:hover + ${SideBarLinkTooltip} {
		@media (min-width: 1025px) {
			visibility: visible;
			opacity: 1;
		}
	}
`;

export const Tree = styled.div`
	overflow-x: ${(props) =>
		props.hiddenOverflow ? 'visible' : 'hidden'};
	overflow-y: clip;
	@media ${device.laptopS} {
		overflow-x: clip;
	}
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
	background-color: #3e4a54;
	overflow: ${(props) =>
		props.hiddenOverflow ? 'visible' : 'hidden'};
	width: 25rem;
	transition: height 0.2s ease-in-out;
	@media (max-width: 1024px) {
		width: unset;
	}
`;

export const TreeItem = styled.li`
	margin: 0.1rem 0;
	position: relative;
	&:not(:last-of-type) {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
`;
