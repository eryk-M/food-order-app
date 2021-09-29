import React from 'react';
import PrivateRoute from 'components/PrivateRoute';

import UserAccount from 'pages/User/UserAccount';
import UserPassword from 'pages/User/UserPassword';
import UserOrders from 'pages/User/UserOrders';
import UserNav from 'pages/User/UserNav';
import UserQuizes from 'pages/User/UserQuizes';
import Quiz from 'components/Quiz';
import Summary from 'components/Quiz/Summary';

import {
	UserContainer,
	UserContent,
	UserHeading,
	UserWrapper,
	UserDesc,
} from './UserElements';

import { useAuth } from 'contexts/AuthContext';

import { GlobalStyle } from 'globalStyles';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserDoc } from 'utils/firebaseGetters';
import { useLocation, Redirect } from 'react-router-dom';

const User = () => {
	const { currentUser, admin } = useAuth();
	const { data } = useFirestoreQuery(getUserDoc(currentUser.uid));
	const { pathname } = useLocation();

	if (admin) return <Redirect to="/admin" />;

	return (
		<UserWrapper className="user">
			<UserHeading>Hello, {currentUser.displayName}!</UserHeading>
			<UserDesc>
				Here you can edit your personal info and see latest orders
			</UserDesc>
			<UserContainer>
				<GlobalStyle backgroundColor="#93949417" />
				<UserNav />
				<UserContent
					margin={pathname === '/user/orders' ? '0' : '5rem'}
				>
					<PrivateRoute
						path="/user"
						exact
						component={UserAccount}
						userData={data}
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
					<PrivateRoute
						path="/user/quizes"
						exact
						component={UserQuizes}
					/>
					<PrivateRoute
						path="/user/quizes/:id"
						exact
						component={Quiz}
					/>
					<PrivateRoute
						path="/user/quizes/:id/summary"
						exact
						component={Summary}
					/>
				</UserContent>
			</UserContainer>
		</UserWrapper>
	);
};

export default User;
