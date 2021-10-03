import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useApi } from 'contexts/APIContext';
import {
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormGroup,
	FormError,
} from 'components/Form/FormElements';

import { Alert } from 'components/Alert';
import { Redirect, useLocation } from 'react-router-dom';

import Loader from 'components/Loader';

import {
	UserAccountHeading,
	UserAccountWrapper,
} from './UserAccountElements';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { getUserDoc } from 'utils/firebaseGetters';

//TODO: REFRESH UI po update

const UserAccount = ({ userData }) => {
	const { currentUser, updateEmail } = useAuth();
	const { updateUserInfo } = useApi();
	const { query } = useLocation();

	const [inputChanged, setInputChanged] = useState(false);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [error, setError] = useState('');

	const validationSchema = Yup.object().shape({
		dummy: Yup.string(),
		email: Yup.string().when('dummy', {
			is: (value) => inputChanged === true,
			then: Yup.string()
				.notOneOf(
					[currentUser.email],
					'Email cannot be the same as your current email'
				)
				.email('Email is invalid'),
		}),
		name: Yup.string()
			.test('name', 'Name must be at least 3 characters', (value) =>
				value ? value.length > 3 : true
			)
			.max(20, 'Name must have maximum of 20 characters')
			.nullable(),
		address: Yup.string()
			.test(
				'address',
				'Address must be at least 3 characters',
				(value) => (value ? value.length > 3 : true)
			)
			.max(30, 'Address must have maximum of 20 characters'),
		phone: Yup.string().test(
			'phone',
			'Phone must be in 9 digits format',
			(value) => (value ? /[0-9]{9}/.test(value) : true)
		),
		city: Yup.string()
			.test('city', 'Only letters are allowed', (value) =>
				value ? /[A-Za-z]/.test(value) : true
			)
			.test('city', 'City must be at least 3 characters', (value) =>
				value ? value.length > 3 : true
			)
			.max(20, 'City must have maximum of 20 characters'),
		zipcode: Yup.string().test(
			'zipcode',
			'Zip code must be in xx-xxx format. Only digits are allowed',
			(value) => (value ? /[0-9]{2}-[0-9]{3}/.test(value) : true)
		),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	if (query) return <Redirect to={query} />;

	if (!user && userData) setUser(userData);

	const onSubmit = async (data) => {
		const promises = [];
		setLoading(true);

		if (data.email !== currentUser.email) {
			promises.push(updateEmail(data.email));
		}

		const capitalizeName =
			data.name?.charAt(0).toUpperCase() + data.name?.slice(1);

		const capitalizeAddress =
			data.address?.charAt(0).toUpperCase() + data.address?.slice(1);

		promises.push(
			updateUserInfo(
				currentUser.uid,
				capitalizeName,
				capitalizeAddress,
				data.phone,
				data.city,
				data.zipcode
			)
		);
		try {
			const allPromise = Promise.all(promises);
			await allPromise;
			setShowSuccess(true);
			const doc = await getUserDoc(currentUser.uid).get();
			setUser(doc.data());
			setTimeout(() => {
				setLoading(false);
				setShowSuccess(false);
			}, 1000);
		} catch (err) {
			setLoading(false);
			setError('Failed to update');
		}
	};

	return (
		<UserAccountWrapper>
			<UserAccountHeading>General Info</UserAccountHeading>
			{!user && <Loader />}
			{user && (
				<Form onSubmit={handleSubmit(onSubmit)}>
					{showSuccess && (
						<Alert right="0" top="-5rem" success>
							Profile updated
						</Alert>
					)}

					{error && <Alert error>{error}</Alert>}

					<FormGroup flex>
						<FormElement id="email">
							<FormLabel>Email</FormLabel>
							<FormInput
								type="email"
								{...register('email')}
								required
								defaultValue={currentUser.email}
								error={errors.email}
								onChange={() => setInputChanged(true)}
							/>
							{errors.email && (
								<FormError>{errors.email.message}</FormError>
							)}
						</FormElement>
					</FormGroup>
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
							{...register('phone')}
							defaultValue={user.phone}
							placeholder="9 digits"
							error={errors.phone}
						/>
						{errors.phone && (
							<FormError>{errors.phone.message}</FormError>
						)}
					</FormElement>
					<FormGroup flex justify="space-between">
						<FormElement id="city">
							<FormLabel>City</FormLabel>
							<FormInput
								type="text"
								{...register('city')}
								defaultValue={user.city}
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
								defaultValue={user.zip}
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
		</UserAccountWrapper>
	);
};

export default UserAccount;
