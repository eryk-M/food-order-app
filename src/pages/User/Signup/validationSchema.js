import * as Yup from 'yup';
import { validateUsername } from 'utils/firebaseGetters';
export const validationSchema = Yup.object().shape({
	userName: Yup.string()
		.required('Username is required')
		.trim()
		.min(4, 'Username must be at least 4 characters')
		.max(12, 'Username must have maximum of 12 characters')
		.test('userName', 'Username is already taken', async (value) => {
			const response = await validateUsername(
				value.split(' ').join('').toLowerCase()
			).get();
			return response.empty;
		}),
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
