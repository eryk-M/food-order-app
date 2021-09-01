import React from 'react';
import Signup from '../../components/Signup';
import SignIn from '../../components/SignIn';
import ForgotPassword from '../../components/ForgotPassword';
import { Switch, Route } from 'react-router-dom';
//TEST
import { Container } from 'react-bootstrap';

const Login = () => {
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: '100vh' }}
		>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				<h1>Login page</h1>
				<Switch>
					<Route path="/login" component={SignIn} />
					<Route path="/signup" component={Signup} />
					<Route path="/forgot-password" component={ForgotPassword} />
				</Switch>
				{/* <SignIn /> */}
			</div>
		</Container>
	);
};

export default Login;
