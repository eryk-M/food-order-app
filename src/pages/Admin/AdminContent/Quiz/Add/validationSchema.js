import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	incorrect: Yup.array().of(
		Yup.string()
			.required('Field is required')
			.min(2, 'Minimum 2 characters')
			.max(40, 'Maximum 40 characters')
			.trim()
	),
	correct: Yup.string()
		.required('Field is required')
		.min(2, 'Minimum 2 characters')
		.max(40, 'Maximum 40 characters')
		.trim(),
	question: Yup.string()
		.required('Field is required')
		.min(5, 'Minimum 5 characters')
		.max(300, 'Maximum 300 characters'),
});
