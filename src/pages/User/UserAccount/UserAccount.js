import React, { useState, useEffect, useMemo } from 'react';
import { useAuth, useApi } from 'contexts';

import { Redirect, useLocation } from 'react-router-dom';

import {
	Loader,
	Form,
	FormElement,
	FormLabel,
	FormInput,
	FormButton,
	FormGroup,
	FormError,
	FormSpan,
	Alert,
} from 'components';

import {
	UserAccountHeading,
	UserAccountWrapper,
} from './UserAccountElements';

import { getUserDoc } from 'utils/firebaseGetters';

//FORM
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

export const UserAccount = ({ userData }) => {
	const { currentUser, updateEmail } = useAuth();
	const { updateUserInfo } = useApi();
	const { query } = useLocation();

	const [inputChanged, setInputChanged] = useState(false);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(
			validationSchema(inputChanged, currentUser)
		),
		defaultValues: useMemo(() => {
			return {
				zipcode: user?.zip,
				name: user?.name,
				address: user?.address,
				phone: user?.phone,
				city: user?.city,
			};
		}, [
			user?.name,
			user?.address,
			user?.phone,
			user?.city,
			user?.zip,
		]),
	});

	useEffect(() => {
		reset(user);
	}, [user, reset]);

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

		const capitalizeCity =
			data.city?.charAt(0).toUpperCase() + data.city?.slice(1);
		promises.push(
			updateUserInfo(
				currentUser.uid,
				capitalizeName,
				capitalizeAddress,
				data.phone,
				capitalizeCity,
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
			{!user && <Loader primary high margincenter />}
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
								disabled={
									currentUser.email === 'test@test.pl' ? 1 : 0
								}
							/>
							{currentUser.email === 'test@test.pl' ? (
								<FormSpan>
									You can't change email in DEMO mode
								</FormSpan>
							) : null}
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
								error={errors.city}
							/>
							{errors.city && (
								<FormError>{errors.city.message}</FormError>
							)}
						</FormElement>
						<FormElement marginleft="2rem">
							<FormLabel>Zip/Postal Code</FormLabel>
							<FormInput
								defaultValue={user.zip}
								type="text"
								{...register('zipcode')}
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
