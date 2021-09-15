import React, { useState, useEffect } from 'react';
import PrivateRoute from 'components/PrivateRoute';

import UserAccount from 'components/User/UserAccount';
import UserPassword from 'components/User/UserPassword';
import UserOrders from 'components/User/UserOrders';
import UserNav from 'components/User/UserNav';

import {
	UserContainer,
	UserContent,
	UserHeading,
	UserWrapper,
	UserDesc,
} from './UserElements';

import { useAuth } from 'contexts/AuthContext';
import { useApi } from 'contexts/APIContext';

import { GlobalStyle } from 'globalStyles';

const User = () => {
	const { currentUser } = useAuth();
	const { getUserInfo } = useApi();
	const [userData, setUserData] = useState();

	useEffect(() => {
		if (!userData) {
			getUserInfo(currentUser.uid).then((data) => {
				setUserData(data);
			});
		}
	}, [currentUser.uid, getUserInfo, userData]);

	return (
		<UserWrapper className="user">
			<UserHeading>Hello, {currentUser.displayName}!</UserHeading>
			<UserDesc>
				Here you can edit your personal info and see latest orders
			</UserDesc>
			<UserContainer>
				<GlobalStyle backgroundColor="#93949417" />
				<UserNav />
				<UserContent>
					<PrivateRoute
						path="/user"
						exact
						component={UserAccount}
						userData={userData}
					/>
					<PrivateRoute
						path="/user/change-password"
						exact
						component={UserPassword}
					/>
					<PrivateRoute
						path="/user/orders"
						exact
						component={UserOrders}
					/>
				</UserContent>
			</UserContainer>
		</UserWrapper>
	);
};

export default User;
