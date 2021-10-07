import React from 'react';
import Signup from 'pages/User/Signup';
import SignIn from 'pages/User/SignIn';
import ForgotPassword from 'pages/User/ForgotPassword';
import {
	Switch,
	Route,
	Redirect,
	useLocation,
} from 'react-router-dom';

import { LoginContainer, LoginCard } from './LoginElements.js';

import { useAuth } from 'contexts/AuthContext.js';

const Login = () => {
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

export default Login;
