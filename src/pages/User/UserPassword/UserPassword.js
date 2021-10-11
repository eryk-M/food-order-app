import React, { useRef, useState } from 'react';

import { useAuth } from 'contexts';

import { UserAccountHeading } from '../UserAccount/UserAccountElements';

import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormSpan,
	Alert,
} from 'components';
import { UserAccountWrapper } from '../UserAccount/UserAccountElements';

export const UserPassword = () => {
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { updatePassword, currentUser } = useAuth();

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
		<UserAccountWrapper>
			<UserAccountHeading>Change password</UserAccountHeading>

			<Form onSubmit={handleSubmit}>
				{showSuccess && (
					<Alert top="110%" success>
						Password changed
					</Alert>
				)}

				{error && <Alert error>{error}</Alert>}
				<FormElement>
					<FormLabel htmlFor="password">Password</FormLabel>
					<FormInput
						type="password"
						name="password"
						required
						ref={passwordRef}
						error={!passwordsMatch}
						autoComplete="on"
						disabled={currentUser.email === 'test@test.pl' ? 1 : 0}
					/>
					{!passwordsMatch && (
						<FormSpan>Passwords do not match</FormSpan>
					)}
					{currentUser.email === 'test@test.pl' ? (
						<FormSpan>
							You can't change password in DEMO mode
						</FormSpan>
					) : null}
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
						autoComplete="on"
						disabled={currentUser.email === 'test@test.pl' ? 1 : 0}
					/>
					{!passwordsMatch && (
						<FormSpan>Passwords do not match</FormSpan>
					)}
					{currentUser.email === 'test@test.pl' ? (
						<FormSpan>
							You can't change password in DEMO mode
						</FormSpan>
					) : null}
				</FormElement>
				<FormButton
					loading={loading}
					text="Update"
					disabled={currentUser.email === 'test@test.pl' ? 1 : 0}
				/>
			</Form>
		</UserAccountWrapper>
	);
};
