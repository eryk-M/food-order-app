import React, { useRef, useState } from 'react';

import { useAuth } from '../../../contexts/AuthContext';

import { UserAccountHeading } from '../UserAccount/UserAccountElements';

import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormSpan,
} from '../../Form/FormElements';
import Loader from '../../Loader';
import { Alert } from '../../Alert';

const UserPassword = () => {
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { updatePassword } = useAuth();

	const [showSuccess, setShowSuccess] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	async function handleSubmit(e) {
		e.preventDefault();
		if (
			passwordRef.current.value !== passwordConfirmRef.current.value
		) {
			return setPasswordsMatch(false);
		}

		try {
			setPasswordsMatch(true);
			setError('');
			setLoading(true);
			await updatePassword(passwordRef.current.value);
			setShowSuccess(true);
			passwordRef.current.value = passwordConfirmRef.current.value =
				'';
			setTimeout(() => {
				setLoading(false);
				setShowSuccess(false);
			}, 4000);
		} catch {
			setError('Failed to update password.');
		}
	}

	return (
		<>
			<UserAccountHeading>Change password</UserAccountHeading>

			<Form onSubmit={handleSubmit}>
				{showSuccess && <Alert success>Password changed</Alert>}
				{error && <Alert error>{error}</Alert>}
				<FormElement>
					<FormLabel htmlFor="password">Password</FormLabel>
					<FormInput
						type="password"
						name="password"
						required
						ref={passwordRef}
						error={!passwordsMatch}
					/>
					{!passwordsMatch && (
						<FormSpan>Passwords do not match</FormSpan>
					)}
				</FormElement>
				<FormElement>
					<FormLabel htmlFor="password-confirm">
						Password Confirmation
					</FormLabel>
					<FormInput
						type="password"
						name="password"
						required
						ref={passwordConfirmRef}
						error={!passwordsMatch}
					/>
					{!passwordsMatch && (
						<FormSpan>Passwords do not match</FormSpan>
					)}
				</FormElement>
				{/* <FormButton disabled={loading} text="Update" type="submit">
					{loading ? <Loader /> : 'Update'}
				</FormButton> */}
				<FormButton loading={loading} text="Update" />
			</Form>
		</>
	);
};

export default UserPassword;
