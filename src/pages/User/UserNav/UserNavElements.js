import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

import {
	BiUser,
	BiBriefcaseAlt,
	BiLogOutCircle,
} from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import {
	AiOutlineQuestionCircle,
	AiOutlinePercentage,
} from 'react-icons/ai';
export const UserSideNav = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-right: 1px solid rgba(0, 0, 0, 0.1);
	width: 18rem;
	@media screen and (max-width: 570px) {
		flex-direction: row;
		width: 100%;
		/* align-items: center; */
	}
`;

export const UserNavIconUser = styled(BiUser)``;

export const UserNavIconBriefcase = styled(BiBriefcaseAlt)``;

export const UserNavIconPassword = styled(RiLockPasswordLine)``;

export const UserNavQuestionMark = styled(AiOutlineQuestionCircle)``;

export const UserNavPercentIcon = styled(AiOutlinePercentage)``;

export const UserNavIconLogout = styled(BiLogOutCircle)`
	margin-right: 1rem;
	font-size: 1.8rem;
	vertical-align: -3px;
`;

export const UserNavList = styled.ul`
	font-size: 1.6rem;
	margin-top: 3.5rem;
	width: 30rem;
	/* margin-top: 3.5rem; */
	@media screen and (max-width: 570px) {
		margin-top: 0;
	}
`;

export const UserNavItem = styled.li`
	width: 60%;
	&:not(:last-child) {
		margin-bottom: 0.5rem;
	}
	@media screen and (max-width: 570px) {
		display: inline-block;
	}
`;

export const UserNavLink = styled(NavLink)`
	&:link,
	&:visited {
		text-decoration: none;
		color: ${(props) =>
			props.logout ? '#fff' : 'var(--color-grey-dark)'};
		text-transform: capitalize;
		background-color: ${(props) =>
			props.logout ? 'var(--color-red)' : ''};
		display: block;
		padding: 1.5rem 3rem;
		@media screen and (max-width: 412px) {
			padding: 1rem 1rem;
		}
	}

	& svg {
		margin-right: 1rem;
		font-size: 1.8rem;
		vertical-align: -3px;
	}
`;
