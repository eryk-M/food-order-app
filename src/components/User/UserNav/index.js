import React, { useState } from 'react';

import {
	UserSideNav,
	UserNavList,
	UserNavItem,
	UserNavLink,
	UserNavIconPassword,
	UserNavIconBriefcase,
	UserNavIconUser,
	UserNavIconLogout,
} from './UserNavElements';

import Button from '../../Button';

import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';

import { FormAlert } from '../../Form/FormElements';

const UserNav = () => {
	const [error, setError] = useState('');
	const { logout } = useAuth();
	const history = useHistory();

	async function handleLogout() {
		setError('');

		try {
			await logout();
			history.push('/login');
		} catch {
			setError('Failed to log out');
		}
	}

	return (
		<UserSideNav>
			<UserNavList>
				<UserNavItem>
					<UserNavLink
						to="/user"
						exact
						activeClassName="active-user-nav"
					>
						<UserNavIconUser />
						Account
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink
						to="/user/change-password"
						activeClassName="active-user-nav"
					>
						<UserNavIconPassword />
						Password
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink
						to="/user/orders"
						activeClassName="active-user-nav"
					>
						<UserNavIconBriefcase />
						My orders
					</UserNavLink>
				</UserNavItem>
			</UserNavList>
			{error && <FormAlert>{error}</FormAlert>}
			<Button onClick={handleLogout} marginbottom="5rem">
				<UserNavIconLogout />
				Log Out
			</Button>
		</UserSideNav>
	);
};

export default UserNav;
