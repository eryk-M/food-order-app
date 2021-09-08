import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useApi } from '../../../contexts/APIContext';
import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormGroup,
} from '../../Form/FormElements';

import { Alert } from '../../Alert';

import Loader from '../../Loader';

import { UserAccountHeading } from './UserAccountElements';

const UserAccount = () => {
	const nameRef = useRef();
	const addressRef = useRef();
	const phoneRef = useRef();
	const zipCodeRef = useRef();
	const cityRef = useRef();
	const emailRef = useRef();

	const { currentUser, updateEmail } = useAuth();
	const { getUserInfo, updateUserInfo } = useApi();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState();

	const [showSuccess, setShowSuccess] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		const promises = [];

		setLoading(true);

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}

		promises.push(
			updateUserInfo(
				currentUser.uid,
				nameRef.current.value.charAt(0).toUpperCase() +
					nameRef.current.value.slice(1),
				addressRef.current.value.charAt(0).toUpperCase() +
					addressRef.current.value.slice(1),
				phoneRef.current.value,
				cityRef.current.value,
				zipCodeRef.current.value
			)
		);

		Promise.all(promises)
			.then(() => {
				setShowSuccess(true);
				getUserInfo(currentUser.uid).then((data) => {
					setUser(data);
				});
			})
			.catch(() => {
				setError('Failed to update');
			})
			.finally(() => {
				setTimeout(() => {
					console.log(user.name);
					emailRef.current.value = currentUser.email;
					nameRef.current.value = user.name;
					addressRef.current.value = user.address;
					phoneRef.current.value = user.phone;
					cityRef.current.value = user.city;
					zipCodeRef.current.value = user.zip;
					setLoading(false);
					setShowSuccess(false);
				}, 4000);
			});
	}

	useEffect(() => {
		if (!user) {
			setLoading(true);
			getUserInfo(currentUser.uid).then((data) => {
				setUser(data);
				setLoading(false);
			});
		}
	}, [currentUser.uid, getUserInfo, user]);

	return (
		<>
			<UserAccountHeading>General Info</UserAccountHeading>
			{!user && <Loader />}
			{user && (
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
							/>
						</FormElement>
					</FormGroup>
					{/* test */}
					<FormElement id="name">
						<FormLabel>Name</FormLabel>
						<FormInput
							type="text"
							ref={nameRef}
							defaultValue={user.name}
							min="3"
							max="20"
						/>
					</FormElement>
					<FormElement id="address">
						<FormLabel>Address</FormLabel>
						<FormInput
							type="text"
							ref={addressRef}
							defaultValue={user.address}
							min="3"
							max="30"
							placeholder="Street, Flat/House number"
						/>
					</FormElement>
					<FormElement id="phone">
						<FormLabel>Phone</FormLabel>
						<FormInput
							type="tel"
							ref={phoneRef}
							defaultValue={user.phone}
							pattern="[0-9]{9}"
							placeholder="9 digits"
						/>
					</FormElement>
					<FormGroup flex>
						<FormElement id="city">
							<FormLabel>City</FormLabel>
							<FormInput
								type="text"
								ref={cityRef}
								defaultValue={user.city}
								// pattern="[A-Za-z]"
							/>
						</FormElement>
						<FormElement id="zipcode" marginleft="2rem">
							<FormLabel>Zip/Postal Code</FormLabel>
							<FormInput
								type="text"
								ref={zipCodeRef}
								defaultValue={user.zip}
								pattern="[0-9]{2}-[0-9]{3}"
								placeholder="e.g. 11-111"
							/>
						</FormElement>
					</FormGroup>
					<FormButton loading={loading} text="Update" />
				</Form>
			)}
		</>
	);
};

export default UserAccount;
