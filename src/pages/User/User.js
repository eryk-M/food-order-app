import React from 'react';
import { PrivateRoute } from 'components';

import {
	UserAccount,
	UserPassword,
	UserOrders,
	UserNav,
	UserQuizes,
	UserCoupons,
} from 'pages';

import Quiz from 'components/Quiz';
import Summary from 'components/Quiz/Summary';

import {
	UserContainer,
	UserContent,
	UserHeading,
	UserWrapper,
	UserDesc,
} from './UserElements';

import { useAuth } from 'contexts';

import { GlobalStyle } from 'globalStyles';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getUserDoc } from 'utils/firebaseGetters';
import { useLocation, Redirect } from 'react-router-dom';

export const User = () => {
	const { currentUser } = useAuth();
	const { data } = useFirestoreQuery(getUserDoc(currentUser.uid));
	const { pathname, query } = useLocation();

	if (query) return <Redirect to={query} />;

	const subtrPathQuiz = pathname.substr(0, 12);

	return (
		<UserWrapper className="user">
			<UserHeading>Hello, {currentUser.displayName}!</UserHeading>
			<UserDesc>
				Here you can edit your personal info and see latest orders
			</UserDesc>
			<UserContainer>
				<GlobalStyle backgroundColor="var(--color-background-grey-light)" />
				<UserNav />
				<UserContent
					margin={
						pathname === '/user/orders' ||
						subtrPathQuiz === '/user/quizes'
							? '0'
							: '5rem'
					}
					pathname={subtrPathQuiz}
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
						userData={data}
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
					<PrivateRoute
						path="/user/coupons"
						exact
						component={UserCoupons}
					/>
				</UserContent>
			</UserContainer>
		</UserWrapper>
	);
};
