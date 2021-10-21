import styled from 'styled-components/macro';

import { NavLink, Link } from 'react-router-dom';

import { device } from 'utils/breakpoints';

export const SideBarContainer = styled.aside`
	color: rgba(255, 255, 255, 0.8);
	position: fixed;
	height: 100vh;
	z-index: 5002;
	background-color: #323940;
	width: 25rem;
	box-shadow: 0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
		0 1rem 1rem rgba(0, 0, 0, 0.22);
	top: 0;
	left: 0;
	bottom: 0;
	font-weight: 100;
	overflow-x: ${({ hiddenOverflow }) =>
		hiddenOverflow ? 'visible' : 'hidden'};
	transition: transform 0.2s ease, width 0.2s ease-in-out;
	.is-active {
		background-color: var(--color-primary) !important;
		& .icon-arrow {
			display: block;
			margin-left: auto;
			font-size: 2rem;
		}
	}

	.tree-menu-opened {
		height: 9.6rem;
	}
	.tree-menu-closed {
		height: 0;
	}
	@media ${device.laptopS} {
		transform: translateX(-26rem);
	}
`;

export const SideBarP = styled.p`
	transition: display 0.2s ease;
`;

export const SideBarLogo = styled(Link)`
	display: block;
	line-height: 1.5;
	padding: 2.3rem 0;
	border-bottom: 1px solid #4b545c;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: height 0.2s ease;
`;
export const SideBarLogoImage = styled.img`
	height: 10rem;
`;

export const SideBarList = styled.ul`
	margin-top: 2.3rem;
	padding: 0 0.4rem;
	width: 100%;
`;
export const SideBarItem = styled.li`
	margin: 0.1rem 0;
	position: relative;
`;

export const SideBarLinkTooltip = styled.span`
	position: absolute;
	background-color: #323940;
	font-size: 1.4rem;
	padding: 1rem;
	left: 120%;
	border-radius: 5px;
	color: #fff;
	top: 0.3rem;
	visibility: hidden;
	opacity: 0;
	transition: visibility 0s, opacity 0.2s ease;
	width: 10rem;
	text-align: center;
`;

export const SideBarLink = styled(NavLink)`
	display: block;
	width: calc(25rem - 0.5rem * 2);
	font-size: 1.6rem;
	padding: 1rem;
	border-radius: 5px;
	display: flex;
	align-items: center;
	@media ${device.mobileM} {
		font-size: 1.8rem;
	}
	& .icon-left {
		font-size: 2.2rem;
		margin-right: 1.2rem;
	}

	& .icon-arrow {
		display: none;
	}
	&:hover {
		background-color: var(--color-primary);
		@media ${device.laptopS} {
			background-color: transparent;
		}
	}

	&:hover + ${SideBarLinkTooltip} {
		@media (min-width: 1025px) {
			visibility: visible;
			opacity: 1;
		}
	}
`;

export const SideBarTree = styled.ul``;
export const SideBarTreeMenu = styled.ul`
	padding: 0 0.8rem;
	width: 100%;
`;
export const SideBarTreeItem = styled.li`
	margin: 0.1rem 0;
`;
export const SideBarTreeLink = styled(Link)`
	display: block;
	font-size: 1.6rem;
	width: calc(24rem - 0.5rem * 2);
	padding: 1rem;
	background-color: #d2404096;
	border-radius: 5px;
	display: flex;
	align-items: center;
	@media ${device.mobileM} {
		font-size: 1.8rem;
	}
	& svg {
		font-size: 2.2rem;
		margin-right: 1.2rem;
	}
`;

export const SideBarClose = styled.p`
	font-size: 2.6rem;
	font-weight: bold;
	padding: 1rem 0;
	margin-left: auto;
	max-width: 100%;
	text-align: center;
	border-bottom: 1px solid #4b545c;
	cursor: pointer;
`;

export const SideBarOverlay = styled.div`
	display: ${({ display }) => display};
	position: fixed;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 5002;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100vh;
`;
