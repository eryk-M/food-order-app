import React, { useState } from 'react';
import { useAuth } from 'contexts';
import { useHistory } from 'react-router-dom';
import {
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
	FormSpanSign,
	FormTooltip,
	FormTooltipIcon,
} from 'components';
import { SignInContainer } from '../SignIn/SignInElements';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { validateUsername } from 'utils/firebaseGetters';

export const Signup = () => {
	const { signup } = useAuth();

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
					const response = await validateUsername(
						value.toLowerCase()
					).get();
					return response.empty;
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
		} catch (e) {
			setLoading(false);
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

	//TODO: spacje usuniete, sprawdzic username testem .join.touppercase to samo na backendzie
	return (
		<>
			<SignInContainer>
				<FormHeading upper="Start journey">Sign Up</FormHeading>
				{errors.fatal && (
					<FormAlert variant="danger">
						{errors.fatal.message}
					</FormAlert>
				)}

				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormElement id="username">
						<FormTooltipIcon />
						<FormTooltip top="-6rem" right="-9rem">
							- Username must be unique
							<br />- Username must have 4 - 12 characters
							<br />- Any spaces will be trimmed out
						</FormTooltip>
						<FormLabel>Username*</FormLabel>
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
						<FormLabel>Email*</FormLabel>
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
						<FormTooltipIcon />
						<FormTooltip top="-3.5rem" right="-9rem">
							- Password must have minimum 6 characters
						</FormTooltip>
						<FormLabel>Password*</FormLabel>
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
						<FormLabel>Password Confirmation*</FormLabel>
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
			</SignInContainer>
			<FormAlternative>
				Already have an account?{' '}
				<FormLink to="/login">
					<FormSpanSign>Login</FormSpanSign>
				</FormLink>
			</FormAlternative>
		</>
	);
};
