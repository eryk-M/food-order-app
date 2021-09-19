import styled from 'styled-components/macro';

import { NavLink, Link } from 'react-router-dom';

export const SideBarContainer = styled.aside`
	color: rgba(255, 255, 255, 0.8);
	position: fixed;
	height: 100vh;
	z-index: 1000;
	background-color: #323940;
	width: 25rem;
	box-shadow: 0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
		0 1rem 1rem rgba(0, 0, 0, 0.22);
	top: 0;
	left: 0;
	bottom: 0;
	font-weight: 100;
	transition: width 0.2s ease-in-out;
	.is-active {
		background-color: var(--color-primary);
		& .icon-arrow {
			display: block;
			margin-left: auto;
			font-size: 2rem;
			transition: all 0.2s ease-in-out;
		}
	}
`;

export const SideBarP = styled.p`
	transition: all 0.1s ease-in-out;
`;

export const SideBarLogo = styled(Link)`
	display: block;
	line-height: 1.5;
	padding: 2.3rem 0;
	border-bottom: 1px solid #4b545c;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const SideBarLogoImage = styled.img`
	height: 10rem;
	transition: height 0.2s ease-in-out;
`;

export const SideBarList = styled.ul`
	margin-top: 2.3rem;
	padding: 0 0.4rem;
	width: 100%;
	transition: all 0.2s ease-in-out;
`;
export const SideBarItem = styled.li`
	margin: 0.1rem 0;
`;
export const SideBarLink = styled(NavLink)`
	display: block;
	width: calc(25rem - 0.5rem * 2);
	font-size: 1.6rem;
	padding: 1rem;
	border-radius: 5px;
	display: flex;
	align-items: center;
	transition: all 0.2s ease-in-out;
	& .icon-left {
		font-size: 2.2rem;
		margin-right: 1.2rem;
		transition: all 0.01s ease-in-out;
	}

	& .icon-arrow {
		display: none;
		transition: all 0.2s ease-in-out;
	}
	&:hover {
		background-color: var(--color-primary);
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
	transition: all 0.2s ease-in-out;
	& svg {
		font-size: 2.2rem;
		margin-right: 1.2rem;
	}
`;
