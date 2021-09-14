import React, { useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useApi } from '../../../contexts/APIContext';
import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormGroup,
	FormError,
} from '../../Form/FormElements';

import { Alert } from '../../Alert';
import { Redirect, useLocation } from 'react-router-dom';

import Loader from '../../Loader';

import { UserAccountHeading } from './UserAccountElements';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// TODO: Aktualizacja inputow po kliknieciu Update np. name > Name

const UserAccount = ({ userData }) => {
	// const nameRef = useRef();
	// const addressRef = useRef();
	// const phoneRef = useRef();
	// const zipCodeRef = useRef();
	// const cityRef = useRef();
	// const emailRef = useRef();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, 'Name must be at least 3 characters')
			.max(20, 'Name must have maximum of 20 characters'),
		address: Yup.string()
			.min(3, 'Address must be at least 3 characters')
			.max(30, 'Address must have maximum of 20 characters'),
		phone: Yup.string().matches(
			/[0-9]{9}/,
			'Phone must be in 9 digits format'
		),
		city: Yup.string()
			.min(3, 'City must be at least 3 characters')
			.max(20, 'City must have maximum of 20 characters')
			.matches(/[A-Za-z]/, 'Only letters are allowed'),
		zipcode: Yup.string().matches(
			/[0-9]{2}-[0-9]{3}/,
			'Zip code must be in xx-xxx format'
		),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({ resolver: yupResolver(validationSchema) });
	const { query } = useLocation();

	const { currentUser, updateEmail } = useAuth();
	const { getUserInfo, updateUserInfo } = useApi();

	// const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState();
	const [showSuccess, setShowSuccess] = useState(false);

	if (query) return <Redirect to={query} />;

	if (!user && userData) setUser(userData);

	// async function handleSubmit(e) {
	// 	e.preventDefault();

	// 	const promises = [];

	// 	setLoading(true);

	// 	if (emailRef.current.value !== currentUser.email) {
	// 		promises.push(updateEmail(emailRef.current.value));
	// 	}

	// 	promises.push(
	// 		updateUserInfo(
	// 			currentUser.uid,
	// 			nameRef.current.value.charAt(0).toUpperCase() +
	// 				nameRef.current.value.slice(1),
	// 			addressRef.current.value.charAt(0).toUpperCase() +
	// 				addressRef.current.value.slice(1),
	// 			phoneRef.current.value,
	// 			cityRef.current.value,
	// 			zipCodeRef.current.value
	// 		)
	// 	);

	// 	Promise.all(promises)
	// 		.then(() => {
	// 			setShowSuccess(true);
	// 			getUserInfo(currentUser.uid).then((data) => {
	// 				setUser(data);
	// 			});
	// 			setTimeout(() => {
	// 				setLoading(false);
	// 				setShowSuccess(false);
	// 			}, 1000);
	// 		})
	// 		.catch(() => {
	// 			setError('Failed to update');
	// 		})
	// 		.finally(() => {});
	// }

	// useEffect(() => {
	// 	showSuccess &&
	// 		setTimeout(() => {
	// 			emailRef.current.value = currentUser.email;
	// 			nameRef.current.value = user.name;
	// 			addressRef.current.value = user.address;
	// 			phoneRef.current.value = user.phone;
	// 			cityRef.current.value = user.city;
	// 			zipCodeRef.current.value = user.zip;
	// 			setLoading(false);
	// 			setShowSuccess(false);
	// 		}, 4000);
	// }, [currentUser.uid, getUserInfo, user]);

	const onSubmit = (data) => console.log(data);

	return (
		<>
			<UserAccountHeading>General Info</UserAccountHeading>
			{!user && <Loader />}
			{user && (
				<Form onSubmit={handleSubmit(onSubmit)}>
					{showSuccess && <Alert success>Profile updated</Alert>}
					{/* {error && <Alert error>{error}</Alert>} */}
					<FormGroup flex>
						<FormElement id="email">
							<FormLabel>Email</FormLabel>
							<FormInput
								type="email"
								{...register('email')}
								required
								defaultValue={currentUser.email}
								error={errors.email}
							/>
							{errors.email && (
								<FormError>{errors.email.message}</FormError>
							)}
						</FormElement>
					</FormGroup>
					{/* test */}
					<FormElement id="name">
						<FormLabel>Name</FormLabel>
						<FormInput
							type="text"
							{...register('name')}
							defaultValue={user.name}
							error={errors.name}
						/>
						{errors.name && (
							<FormError>{errors.name.message}</FormError>
						)}
					</FormElement>
					<FormElement id="address">
						<FormLabel>Address</FormLabel>
						<FormInput
							type="text"
							{...register('address')}
							defaultValue={user.address}
							placeholder="Street, Flat/House number"
							error={errors.address}
						/>
						{errors.address && (
							<FormError>{errors.address.message}</FormError>
						)}
					</FormElement>
					<FormElement id="phone">
						<FormLabel>Phone</FormLabel>
						<FormInput
							type="tel"
							// ref={phoneRef}
							{...register('phone')}
							defaultValue={user.phone}
							// pattern="[0-9]{9}"
							placeholder="9 digits"
							error={errors.phone}
						/>
						{errors.phone && (
							<FormError>{errors.phone.message}</FormError>
						)}
					</FormElement>
					<FormGroup flex>
						<FormElement id="city">
							<FormLabel>City</FormLabel>
							<FormInput
								type="text"
								{...register('city')}
								// ref={cityRef}
								defaultValue={user.city}
								// pattern="[A-Za-z]"
								error={errors.city}
							/>
							{errors.city && (
								<FormError>{errors.city.message}</FormError>
							)}
						</FormElement>
						<FormElement id="zipcode" marginleft="2rem">
							<FormLabel>Zip/Postal Code</FormLabel>
							<FormInput
								type="text"
								{...register('zipcode')}
								// ref={zipCodeRef}
								defaultValue={user.zip}
								// pattern="[0-9]{2}-[0-9]{3}"
								placeholder="e.g. 11-111"
								error={errors.zipcode}
							/>
							{errors.zipcode && (
								<FormError>{errors.zipcode.message}</FormError>
							)}
						</FormElement>
					</FormGroup>
					<FormButton loading={loading} text="Update" />
				</Form>
			)}
		</>
	);
};

export default UserAccount;
