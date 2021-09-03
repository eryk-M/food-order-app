import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import Loader from '../../Loader/index';
import {
	FormContainer,
	FormHeading,
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormAlternative,
	FormLink,
	FormAlert,
} from '../../Form/FormElements';

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push('/user');
		} catch {
			setError('Failed to sign in. Email is incorrect.');
		}

		setLoading(false);
	}

	return (
		<>
			<FormContainer>
				<FormHeading>Log In</FormHeading>
				{error && <FormAlert variant="danger">{error}</FormAlert>}
				<Form onSubmit={handleSubmit}>
					<FormElement id="email">
						<FormLabel>Email</FormLabel>
						<FormInput
							type="email"
							ref={emailRef}
							placeholder="example@example.com"
							required
						/>
					</FormElement>
					<FormElement id="password">
						<FormLabel>Password</FormLabel>
						<FormInput
							type="password"
							ref={passwordRef}
							placeholder="Enter your password"
							required
						/>
					</FormElement>

					<FormButton disabled={loading} type="submit">
						{loading ? <Loader /> : 'Log In'}
						{/* <Loader /> */}
					</FormButton>
				</Form>
				<FormAlternative>
					<FormLink to="/forgot-password">Forgot Password?</FormLink>
				</FormAlternative>
			</FormContainer>
			<FormAlternative>
				Need an account? <FormLink to="/signup">Sign up</FormLink>
			</FormAlternative>
		</>
	);
};

export default SignIn;
