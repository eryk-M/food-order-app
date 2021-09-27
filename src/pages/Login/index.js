import React from 'react';
import Signup from 'pages/User/Signup';
import SignIn from 'pages/User/SignIn';
import ForgotPassword from 'pages/User/ForgotPassword';
import { Switch, Route } from 'react-router-dom';

import {
	LoginContainer,
	LoginLeft,
	LoginRight,
	LoginContent,
	LoginHeading,
	LoginDesc,
} from './LoginElements.js';

const Login = () => {
	return (
		<LoginContainer>
			<LoginLeft>
				<LoginContent>
					<LoginHeading>Welcome to Burger Website</LoginHeading>
					<LoginDesc>
						Create an account to rate and comment our products.
						<br />
						<br /> You can also check your last orders.
					</LoginDesc>
				</LoginContent>
			</LoginLeft>
			<LoginRight>
				<Switch>
					<Route path="/login" component={SignIn} />
					<Route path="/signup" component={Signup} />
					<Route path="/forgot-password" component={ForgotPassword} />
				</Switch>
			</LoginRight>
		</LoginContainer>
	);
};

export default Login;
