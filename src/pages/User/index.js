import React from 'react';
import PrivateRoute from '../../components/PrivateRoute';

import UserAccount from '../../components/User/UserAccount';
import UserPassword from '../../components/User/UserPassword';
import UserOrders from '../../components/User/UserOrders';
import UserNav from '../../components/User/UserNav';

import { UserContainer, UserContent } from './UserElements';

import { GlobalStyle } from '../../globalStyles';

const User = () => {
	return (
		<UserContainer>
			<GlobalStyle backgroundColor="#93949417" />
			<UserNav />
			<UserContent>
				<PrivateRoute path="/user" exact component={UserAccount} />
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
	);
};

export default User;
