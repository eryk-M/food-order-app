import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormGroup,
	FormSpan,
} from '../../Form/FormElements';

import { Alert } from '../../Alert';

import { UserAccountHeading } from './UserAccountElements';

const UserAccount = () => {
	const nameRef = useRef();
	const usernameRef = useRef();
	const addressRef = useRef();
	const phoneRef = useRef();
	const zipCodeRef = useRef();
	const cityRef = useRef();
	const emailRef = useRef();

	const { currentUser, updateEmail } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const [showSuccess, setShowSuccess] = useState(false);
	const [spanEmail, setSpanEmail] = useState('');
	const [emailError, setEmailError] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		if (emailRef.current.value === currentUser.email) {
			setEmailError(true);
			setSpanEmail('Email is the same as before');
			return;
		}

		try {
			setEmailError('');
			setSpanEmail(false);
			setError('');
			setLoading(true);
			await updateEmail(emailRef.current.value);
			setShowSuccess(true);
			setTimeout(() => {
				setLoading(false);
				setShowSuccess(false);
			}, 4000);
		} catch {
			setLoading(false);
			setError('Failed to update email.');
		}
	}

	return (
		<>
			<UserAccountHeading>General Info</UserAccountHeading>
			{/* {error && <Alert variant="danger">{error}</Alert>} */}
			<Form onSubmit={handleSubmit}>
				{showSuccess && <Alert success>Profile updated</Alert>}
				{error && <Alert error>{error}</Alert>}
				<FormGroup flex>
					<FormElement id="email">
						<FormLabel>Email</FormLabel>
						<FormInput
							type="email"
							ref={emailRef}
							required
							defaultValue={currentUser.email}
							error={emailError}
						/>
						{emailError && <FormSpan>{spanEmail}</FormSpan>}
					</FormElement>
					<FormElement id="username" marginleft="2rem">
						<FormLabel>Username</FormLabel>
						<FormInput
							type="text"
							ref={usernameRef}
							// required
							// defaultValue={currentUser.email}
						/>
					</FormElement>
				</FormGroup>
				{/* test */}
				<FormElement id="name">
					<FormLabel>Name</FormLabel>
					<FormInput
						type="text"
						ref={nameRef}
						// defaultValue={currentUser.email}
					/>
				</FormElement>
				<FormElement id="address">
					<FormLabel>Address</FormLabel>
					<FormInput
						type="text"
						ref={addressRef}
						// defaultValue={currentUser.email}
					/>
				</FormElement>
				<FormElement id="phone">
					<FormLabel>Phone</FormLabel>
					<FormInput
						type="number"
						ref={phoneRef}
						// defaultValue={currentUser.email}
					/>
				</FormElement>
				<FormGroup flex>
					<FormElement id="city">
						<FormLabel>City</FormLabel>
						<FormInput
							type="text"
							ref={cityRef}
							// defaultValue={currentUser.email}
						/>
					</FormElement>
					<FormElement id="zipcode" marginleft="2rem">
						<FormLabel>Zip/Postal Code</FormLabel>
						<FormInput
							type="number"
							ref={zipCodeRef}
							// defaultValue={currentUser.email}
						/>
					</FormElement>
				</FormGroup>
				{/* test */}
				<FormButton loading={loading} text="Update" />
			</Form>
		</>
	);
};

export default UserAccount;
