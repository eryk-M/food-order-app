import React from 'react';
import { Signup, SignIn, ForgotPassword } from 'pages';
import {
	Switch,
	Route,
	Redirect,
	useLocation,
} from 'react-router-dom';

import { LoginContainer, LoginCard } from './LoginElements.js';

import { useAuth } from 'contexts';

export const Login = () => {
	const { currentUser } = useAuth();
	const { query } = useLocation();
	if (currentUser)
		return <Redirect to={{ pathname: '/user', query: query }} />;
	return (
		<LoginContainer>
			<LoginCard>
				<Switch>
					<Route path="/login" component={SignIn} />
					<Route path="/signup" component={Signup} />
					<Route path="/forgot-password" component={ForgotPassword} />
				</Switch>
			</LoginCard>
		</LoginContainer>
	);
};
