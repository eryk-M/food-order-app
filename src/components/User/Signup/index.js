import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

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

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const userNameRef = useRef();

	const { signup } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		if (
			passwordRef.current.value !== passwordConfirmRef.current.value
		) {
			return setError('Passwords do not match');
		} else if (passwordRef.current.value.length < 6) {
			return setError(
				'Password has to be at least 6 characters long'
			);
		} else if (userNameRef.current.value.indexOf(' ') >= 0) {
			return setError('Username has to be without spaces');
		} else if (userNameRef.current.value.length < 4) {
			return setError('Username must have at least 4 characters');
		}

		try {
			setError('');
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				userNameRef.current.value,
				history
			);
		} catch (e) {
			setError(e.message);
		}

		setLoading(false);
	}

	return (
		<>
			<FormContainer>
				<FormHeading>Sign Up</FormHeading>
				{error && <FormAlert variant="danger">{error}</FormAlert>}
				<Form onSubmit={handleSubmit}>
					<FormElement id="username">
						<FormLabel>Username (4 - 12 characters) *</FormLabel>
						<FormInput
							type="text"
							ref={userNameRef}
							placeholder="Your username"
							required
							maxLength="12"
							disabled={loading}
						/>
					</FormElement>
					<FormElement id="email">
						<FormLabel>Email *</FormLabel>
						<FormInput
							type="email"
							ref={emailRef}
							placeholder="example@example.com"
							required
							disabled={loading}
						/>
					</FormElement>
					<FormElement id="password">
						<FormLabel>Password (min 6 characters) *</FormLabel>
						<FormInput
							type="password"
							ref={passwordRef}
							placeholder="Enter your password"
							required
							disabled={loading}
						/>
					</FormElement>
					<FormElement id="password-confirm">
						<FormLabel>Password Confirmation *</FormLabel>
						<FormInput
							type="password"
							ref={passwordConfirmRef}
							placeholder="Confirm your password"
							required
							disabled={loading}
						/>
					</FormElement>
					<FormButton loading={loading} text="Sign Up" />
				</Form>
			</FormContainer>
			<FormAlternative>
				Already have an account?{' '}
				<FormLink to="/login">Log In</FormLink>
			</FormAlternative>
		</>
	);
};

export default Signup;
