import React, { useState } from 'react';

import {
	UserSideNav,
	UserNavList,
	UserNavItem,
	UserNavLink,
	UserLogout,
} from './UserNavElements';

import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';

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
					<UserNavLink to="/user">Account</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink to="/user/change-password">
						Password
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink to="/user/orders">My orders</UserNavLink>
				</UserNavItem>
			</UserNavList>
			<UserLogout onClick={handleLogout}>Log Out</UserLogout>
		</UserSideNav>
	);
};

export default UserNav;
