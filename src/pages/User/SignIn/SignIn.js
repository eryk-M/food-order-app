import React, { useState } from 'react';
import { useAuth } from 'contexts';
import { useHistory, useLocation } from 'react-router-dom';

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
	FormSpanSign,
} from 'components';

import { SignInContainer } from './SignInElements';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const SignIn = () => {
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { query } = useLocation();

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is required')
			.email('Email is invalid'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({ resolver: yupResolver(validationSchema) });

	const onSubmit = async (data) => {
		try {
			clearErrors();
			setLoading(true);
			await login(data.email, data.password, history, query);
		} catch {
			setLoading(false);
			setError(
				'email',
				{
					message: 'Email or password is incorrect',
				},
				{ shouldFocus: true }
			);
			setError('password', {
				message: 'Email or password is incorrect',
			});
		}
	};
	const onSubmitDemo = async () => {
		try {
			clearErrors();
			setLoading(true);
			await login('test@test.pl', 'test123', history, query);
		} catch {
			setLoading(false);
		}
	};

	return (
		<>
			<SignInContainer>
				<FormHeading upper="Welcome back">Login</FormHeading>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormElement id="email">
						<FormLabel>Email</FormLabel>
						<FormInput
							type="email"
							placeholder="example@example.com"
							disabled={loading}
							{...register('email')}
							error={errors.email}
						/>
						{errors.email && (
							<FormError>{errors.email.message}</FormError>
						)}
					</FormElement>
					<FormElement id="password">
						<FormLabel>Password</FormLabel>
						<FormInput
							type="password"
							placeholder="Enter your password"
							disabled={loading}
							{...register('password')}
							error={errors.password}
						/>
						{errors.password && (
							<FormError>{errors.password.message}</FormError>
						)}
					</FormElement>

					<FormButton loading={loading} text="Login" />
				</Form>

				<FormButton
					secondary
					loading={loading}
					text="DEMO"
					type="text"
					onClick={onSubmitDemo}
				/>

				<FormAlternative>
					<FormLink to="/forgot-password">Forgot Password?</FormLink>
				</FormAlternative>
			</SignInContainer>
			<FormAlternative>
				Need an account?{' '}
				<FormLink to={{ pathname: '/signup', query: query }}>
					<FormSpanSign>Sign up</FormSpanSign>
				</FormLink>
			</FormAlternative>
		</>
	);
};
