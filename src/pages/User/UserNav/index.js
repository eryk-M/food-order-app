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
	UserNavQuestionMark,
	UserNavPercentIcon,
} from './UserNavElements';

// import Button from 'components/Button';

import { useHistory } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

import { FormAlert } from 'components/Form/FormElements';

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
						<span>Account</span>
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink
						to="/user/change-password"
						activeClassName="active-user-nav"
					>
						<UserNavIconPassword />
						<span>Password</span>
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink
						to="/user/orders"
						activeClassName="active-user-nav"
					>
						<UserNavIconBriefcase />
						<span>My orders</span>
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink
						to="/user/quizes"
						activeClassName="active-user-nav"
					>
						<UserNavQuestionMark />
						<span>Quizes</span>
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink
						to="/user/coupons"
						activeClassName="active-user-nav"
					>
						<UserNavPercentIcon />
						<span>Coupons</span>
					</UserNavLink>
				</UserNavItem>
				<UserNavItem>
					<UserNavLink logout="true" to="#" onClick={handleLogout}>
						<UserNavIconLogout />
						<span>Log Out</span>
					</UserNavLink>
				</UserNavItem>
			</UserNavList>
			{error && <FormAlert>{error}</FormAlert>}
			{/* <Button onClick={handleLogout} marginbottom="5rem">
				<UserNavIconLogout />
				Log Out
			</Button> */}
		</UserSideNav>
	);
};

export default UserNav;
