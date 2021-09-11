import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory, useParams, useLocation } from 'react-router-dom';

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
	const { query } = useLocation();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			history.push({ pathname: '/user', query: query });
		} catch {
			setLoading(false);
			setError('Failed to sign in. Email or password is incorrect.');
		}
	}

	async function handleLoginDemo() {
		try {
			setError('');
			setLoading(true);
			await login('test@test.pl', 'test123');
			setLoading(false);
			history.push({ pathname: '/user', query: query });
		} catch {
			setLoading(false);
			setError('Failed to sign in. Email or password is incorrect.');
		}
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
							disabled={loading}
							required
						/>
					</FormElement>
					<FormElement id="password">
						<FormLabel>Password</FormLabel>
						<FormInput
							type="password"
							ref={passwordRef}
							placeholder="Enter your password"
							disabled={loading}
							required
						/>
					</FormElement>

					<FormButton loading={loading} text="Log In" />
				</Form>

				<FormButton
					secondary
					loading={loading}
					text="DEMO"
					type="text"
					onClick={handleLoginDemo}
				/>
				<FormAlternative>
					<FormLink to="/forgot-password">Forgot Password?</FormLink>
				</FormAlternative>
			</FormContainer>
			<FormAlternative>
				Need an account?{' '}
				<FormLink to={{ pathname: '/signup', query: query }}>
					Sign up
				</FormLink>
			</FormAlternative>
		</>
	);
};

export default SignIn;
