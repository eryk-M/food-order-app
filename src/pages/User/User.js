import React from 'react';

import {
	UserAccount,
	UserPassword,
	UserOrders,
	UserNav,
	UserQuizes,
	UserCoupons,
	Quiz,
	QuizSummary,
} from 'pages';

import {
	UserContainer,
	UserContent,
	UserHeading,
	UserWrapper,
	UserDesc,
} from './UserElements';

import { useAuth } from 'contexts';

import { GlobalStyle } from 'globalStyles';

import { useFirestoreQuery } from 'hooks';
import { getUserDoc } from 'utils/firebaseGetters';
import {
	useLocation,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

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
					<Switch>
						<Route path="/user" exact>
							<UserAccount userData={data} />
						</Route>
						<Route
							path="/user/change-password"
							exact
							component={UserPassword}
						/>
						<Route path="/user/orders" exact component={UserOrders} />
						<Route path="/user/quizes" exact component={UserQuizes}>
							<UserQuizes userData={data} />
						</Route>
						<Route path="/user/quizes/:id" exact component={Quiz} />
						<Route
							path="/user/quizes/:id/summary"
							exact
							component={QuizSummary}
						/>
						<Route
							path="/user/coupons"
							exact
							component={UserCoupons}
						/>
						<Route>
							<Redirect to="/404" />
						</Route>
					</Switch>
				</UserContent>
			</UserContainer>
		</UserWrapper>
	);
};
