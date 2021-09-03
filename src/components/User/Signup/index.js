import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

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
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push('/user');
		} catch {
			setError('Failed to create an account');
		}

		setLoading(false);
	}

	return (
		<>
			<FormContainer>
				<FormHeading>Sign Up</FormHeading>
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
					<FormElement id="password-confirm">
						<FormLabel>Password Confirmation</FormLabel>
						<FormInput
							type="password"
							ref={passwordConfirmRef}
							placeholder="Confirm your password"
							required
						/>
					</FormElement>
					<FormButton disabled={loading} type="submit">
						Sign Up
					</FormButton>
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
