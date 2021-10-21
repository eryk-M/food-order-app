import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';
import { device } from 'utils/breakpoints';
export const NavBurgerContainer = styled.nav`
	position: fixed;
	background-color: var(--color-grey-dark);
	width: 35rem;
	height: 100vh;
	z-index: 5007;
	transition: all 0.5s;
	right: -35rem;
	top: 0;
	font-weight: 700;
	right: ${({ right }) => right};
`;

export const NavBurgerIcons = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export const NavBurgerList = styled.ul``;
export const NavBurgerItem = styled.li``;
export const NavBurgerLink = styled(Link)`
	font-size: 3rem;
	color: var(--color-white);
	display: block;
	padding: 2rem;
	text-transform: uppercase;
	font-family: 'Arvo', sans-serif;

	@media ${device.mobileL} {
		font-size: 2rem;
	}
`;

export const NavBurgerIconLink = styled(Link)`
	padding: 5rem 2rem;
	width: 50%;
	position: relative;
	color: var(--color-grey-light);
	&:first-of-type {
		border-right: 1px solid rgba(255, 255, 255, 0.3);
	}
`;

export const NavBurgerClose = styled.div`
	font-size: 3rem;
	color: var(--color-grey-light);
	font-family: 'Arvo', sans-serif;
	padding: 1rem;
	padding-left: 2rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	cursor: pointer;
`;

export const NavBurgerOverlay = styled.div`
	display: ${({ display }) => display};
	position: fixed;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 5006;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100vh;
`;
