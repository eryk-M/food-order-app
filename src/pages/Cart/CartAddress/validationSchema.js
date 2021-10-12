import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(3, 'Name must be at least 3 characters')
		.max(30, 'Name must have maximum of 30 characters'),
	address: Yup.string()
		.required('Address is required')
		.min(3, 'Address must be at least 3 characters')
		.max(40, 'Address must have maximum of 40 characters'),
	phone: Yup.string()
		.required('Phone is required')
		.min(9, 'Phone must be in 9 digits format')
		.max(9, 'Phone must be in 9 digits format'),
	city: Yup.string()
		.required('City is required')
		.min(3, 'City must be at least 3 characters')
		.max(20, 'City must have maximum of 20 characters')
		.matches(/[A-Za-z]/, 'Only letters are allowed'),
	zipcode: Yup.string()
		.required('Zip code is required')
		.matches(
			/[0-9]{2}-[0-9]{3}/,
			'Zip code must be in xx-xxx format. Only digits are allowed'
		),
});
