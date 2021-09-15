import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { useApi } from 'contexts/APIContext';
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
	FormError,
	FormAlert,
} from 'components/Form/FormElements';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {
	//TODO: username musi sie zgadzac teraz nie wazne czy mala czy duza to sie nie zgadza

	const { signup } = useAuth();
	const { validateUsername } = useApi();

	const validationSchema = Yup.object().shape({
		userName: Yup.string()
			.required('Username is required')
			.trim()
			.min(4, 'Username must be at least 4 characters')
			.max(12, 'Username must have maximum of 12 characters')
			.test(
				'userName',
				'Username is already taken',
				async (value) => {
					let response = await validateUsername(value).then((el) => {
						return !el;
					});
					return response;
				}
			),
		email: Yup.string()
			.required('Email is required')
			.email('Email is invalid'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({ resolver: yupResolver(validationSchema) });

	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const onSubmit = async (data) => {
		try {
			clearErrors();
			setLoading(true);
			await signup(data.email, data.password, data.userName, history);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			console.log();
			if (e.message === 'auth/email-already-in-use') {
				setError('email', {
					message: 'E-mail already in use!',
				});
			} else {
				setError('fatal', {
					message: 'Something went wrong. Please try again.',
				});
			}
		}
	};

	return (
		<>
			<FormContainer>
				<FormHeading>Sign Up</FormHeading>
				{errors.fatal && (
					<FormAlert variant="danger">
						{errors.fatal.message}
					</FormAlert>
				)}
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormElement id="username">
						<FormLabel>Username (4 - 12 characters) *</FormLabel>
						<FormInput
							type="text"
							placeholder="Your username"
							{...register('userName')}
							disabled={loading}
							error={errors.userName}
						/>
						{errors.userName && (
							<FormError>{errors.userName.message}</FormError>
						)}
					</FormElement>
					<FormElement id="email">
						<FormLabel>Email *</FormLabel>
						<FormInput
							type="email"
							{...register('email')}
							placeholder="example@example.com"
							disabled={loading}
							error={errors.email}
						/>
						{errors.email && (
							<FormError>{errors.email.message}</FormError>
						)}
					</FormElement>
					<FormElement id="password">
						<FormLabel>Password (min 6 characters) *</FormLabel>
						<FormInput
							type="password"
							{...register('password')}
							placeholder="Enter your password"
							disabled={loading}
							error={errors.password}
						/>
						{errors.password && (
							<FormError>{errors.password.message}</FormError>
						)}
					</FormElement>
					<FormElement id="password-confirm">
						<FormLabel>Password Confirmation *</FormLabel>
						<FormInput
							type="password"
							{...register('confirmPassword')}
							placeholder="Confirm your password"
							disabled={loading}
							error={errors.confirmPassword}
						/>
						{errors.confirmPassword && (
							<FormError>{errors.confirmPassword.message}</FormError>
						)}
					</FormElement>
					<FormButton loading={loading} text="Sign Up" />
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
