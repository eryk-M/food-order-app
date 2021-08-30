import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';

export const NavBurgerContainer = styled.div`
	position: fixed;
	background-color: var(--color-grey-dark);
	width: 35rem;
	height: 100vh;
	z-index: 3;
	right: -35rem;
`;

export const NavBurgerIcons = styled.div`
	/* background-color: orangered; */
	display: flex;
	align-items: center;
	text-align: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export const NavBurgerList = styled.ul``;
export const NavBurgerItem = styled.li``;
export const NavBurgerLink = styled(Link)`
	font-size: 3rem;
	/* background-color: yellow; */
	color: var(--color-white);
	display: block;
	padding: 2rem;
	text-transform: uppercase;
	font-family: 'Arvo', sans-serif;
`;

export const NavBurgerIconLink = styled(Link)`
	padding: 5rem 2rem;
	/* height: 13rem; */
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
	/* text-align: center; */
	cursor: pointer;
`;
