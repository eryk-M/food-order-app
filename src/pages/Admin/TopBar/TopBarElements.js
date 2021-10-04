import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

import { device } from 'utils/breakpoints';

export const TopBarNav = styled.nav`
	position: fixed;
	top: 0;
	background-color: var(--color-white);
	width: 100%;
	margin-left: 25rem;
	border-bottom: 1px solid #dee2e6;
	padding: 2rem;
	transition: margin-left 0.2s ease-in-out;
	z-index: 5001;
	@media only screen and (max-width: 1024px) {
		margin-left: 0;
	}
`;

export const TopBarList = styled.ul`
	display: flex;
	align-items: center;
	font-size: 1.8rem;
	font-weight: 100;

	@media ${device.mobileM} {
		font-size: 1.8rem;
	}
`;

export const TopBarItem = styled.li``;

export const TopBarNavLink = styled(NavLink)`
	padding: 2rem 2rem;
	color: #909090;
	& svg {
		font-size: 2.4rem;
		vertical-align: middle;
		color: #909090;
		&:hover {
			color: var(--color-black);
		}
	}

	&:hover {
		color: var(--color-black);
	}
	@media ${device.mobileM} {
		padding: 2rem 1rem;
	}
`;
