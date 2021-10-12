import * as Yup from 'yup';

export const validationSchema = (inputChanged, currentUser) =>
	Yup.object().shape({
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
