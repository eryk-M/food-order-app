import React, { useRef, useState } from 'react';

import { useAuth } from '../../../contexts/AuthContext';

const UserPassword = () => {
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { updatePassword } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

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
			await updatePassword(passwordRef.current.value);
			setLoading(false);
			alert('password updated');
		} catch {
			setError('Failed to update password.');
		}
	}

	return (
		<>
			<div>UserPassword</div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						required
						ref={passwordRef}
					/>
				</div>
				<div>
					<label htmlFor="password-confirm">
						Password Confirmation
					</label>
					<input
						type="password"
						name="password"
						required
						ref={passwordConfirmRef}
					/>
				</div>
				<button disabled={loading} type="submit">
					Update
				</button>
			</form>
		</>
	);
};

export default UserPassword;
