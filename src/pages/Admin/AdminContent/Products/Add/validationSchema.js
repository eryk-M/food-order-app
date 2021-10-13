import * as Yup from 'yup';

const FILE_SIZE = 1048576;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

export const validationSchema = (ingredients) =>
	Yup.object().shape({
		dummy: Yup.string(),
		file: Yup.mixed()
			.test('file', 'File is required', (value) =>
				value.length ? true : false
			)
			.test('fileSize', 'File too large. Max 1 MB', (value) => {
				if (!value.length) return true;
				return value[0].size <= FILE_SIZE;
			})
			.test(
				'fileFormat',
				'Unsupported file type. Only images in jpeg or png.',
				(value) => {
					if (!value.length) return true;
					return SUPPORTED_FORMATS.includes(value[0].type);
				}
			),
		ingredients: Yup.mixed().when('dummy', {
			is: (value) => ingredients.length === 0,
			then: Yup.string().test(
				'ingredients',
				'Add minimum 1 ingredient',
				(value) => false
			),
		}),
		name: Yup.string()
			.required('Name is required')
			.min(3, 'Name must be at least 3 characters')
			.matches(/^[a-z][a-z\s]*$/i, 'Only letters are allowed')
			.trim()
			.max(20, 'Name must have maximum of 20 characters'),
		description: Yup.string()
			.required('Description is required')
			.min(10, 'Description must be at least 10 characters')
			.trim()
			.max(200, 'Maximum of 200 characters'),
		price: Yup.string()
			.required('Price is required')
			.trim()
			.test(
				'discount',
				'Price must be from 1$ to 99$',
				(value) => value > 0 && value < 100
			)
			.test('price', 'Format: e.g. 11, 12.99', (value) =>
				(value + '').match(/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/)
			),
		discount: Yup.string()
			.trim()
			.test('discount', 'Value from 0 - 99', (value) =>
				value
					? value >= 0 && value < 100 && /[0-9]/.test(value)
					: true
			),
	});
