import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';

export const UserSideNav = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

export const UserNavList = styled.ul`
	font-size: 1.4rem;
	/* margin-top: 3.5rem; */
`;

export const UserNavItem = styled.li`
	&:not(:last-child) {
		margin-bottom: 0.5rem;
	}
`;

export const UserNavLink = styled(Link)`
	&:link,
	&:visited {
		text-decoration: none;
		color: var(color-grey-dark);
		text-transform: uppercase;
		display: block;
		padding: 1.5rem 3rem;
		/* background-color: #e2e2e2; */
	}
`;

export const UserLogout = styled.button``;
