import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

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

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instructions');
		} catch {
			setError('Failed to reset password');
		}

		setLoading(false);
	}

	return (
		<>
			<FormContainer>
				<FormHeading className="text-center mb-4">
					Reset Password
				</FormHeading>
				{error && <FormAlert variant="danger">{error}</FormAlert>}
				{message && (
					<FormAlert variant="success">{message}</FormAlert>
				)}
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
					<FormButton disabled={loading} type="submit">
						Reset Password
					</FormButton>
				</Form>
				<FormAlternative>
					<FormLink to="/login">Login again</FormLink>
				</FormAlternative>
			</FormContainer>
			<FormAlternative>
				Need and account? <FormLink to="/signup">Sign up</FormLink>
			</FormAlternative>
		</>
	);
};

export default ForgotPassword;
