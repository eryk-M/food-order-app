import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
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
} from 'components/Form/FormElements';

import { SignInContainer } from './SignInElements';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignIn = () => {
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
			setLoading(false);
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
			setLoading(false);
		} catch {
			setLoading(false);
		}
	};

	const onSubmitAdmin = async () => {
		try {
			clearErrors();
			setLoading(true);
			await login('admin@admin.pl', 'admin123', history, query);
			setLoading(false);
		} catch {
			setLoading(false);
		}
	};
	//TODO: Do skonczenia RWD dla komponentow logowania i rejestracji
	return (
		<>
			<SignInContainer>
				<FormHeading>Log In</FormHeading>
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

					<FormButton loading={loading} text="Log In" />
				</Form>

				<FormButton
					secondary
					loading={loading}
					text="DEMO"
					type="text"
					onClick={onSubmitDemo}
				/>
				<FormButton
					secondary
					loading={loading}
					text="ADMIN"
					type="text"
					onClick={onSubmitAdmin}
				/>
				<FormAlternative>
					<FormLink to="/forgot-password">Forgot Password?</FormLink>
				</FormAlternative>
			</SignInContainer>
			<FormAlternative>
				Need an account?{' '}
				<FormLink to={{ pathname: '/signup', query: query }}>
					Sign up
				</FormLink>
			</FormAlternative>
		</>
	);
};

export default SignIn;
