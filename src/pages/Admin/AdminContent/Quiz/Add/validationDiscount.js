import * as Yup from 'yup';
import {
	validateCouponCode,
	validateQuizTitle,
	getCoupons,
	getQuizes,
} from 'utils/firebaseGetters';

export const validationDiscount = Yup.object().shape({
	title: Yup.string()
		.required('Title is required')
		.min(3, 'Minimum 3 characters')
		.max(20, 'Maximum 20 characters')
		.trim()
		.test('validate title', 'Title already exist', async (value) => {
			if (value) {
				const response = await validateQuizTitle(
					value.toUpperCase()
				).get();

				return response?.empty;
			}
		})
		.test(
			'number of coupons',
			'Maximum of 10 quizzes exceeded. Delete at least one.',
			async (value) => {
				if (value) {
					const response = await getQuizes().get();
					if (response.docs.length >= 10) {
						return false;
					} else return true;
				}
			}
		),
	discount: Yup.string()
		.required('Discount is required')
		.trim()
		.test(
			'discount',
			'Number must be from 1 to 99',
			(value) => value > 0 && value < 100
		)
		.test('numbers', 'Only digits are allowed', (value) =>
			value ? /[0-9]/.test(value) : true
		),
	fromPrice: Yup.string()
		.required('Price is required')
		.test(
			'fromPrice',
			'Number must be from 1 to 200',
			(value) => value > 0 && value < 200
		)
		.trim()
		.test('numbers', 'Only digits are allowed', (value) =>
			value ? /[0-9]/.test(value) : true
		),
	code: Yup.string()
		.required('Code is required')
		.min(5, 'Minimum 5 characters')
		.max(12, 'Maximum 12 characters')
		.trim()
		.test(
			'discount',
			'Code cannot contain any space',
			(value) => !/\s/.test(value)
		)
		.test('discount', 'Code already exists', async (value) => {
			if (value) {
				const response = await validateCouponCode(
					value.toUpperCase()
				).get();

				return response?.empty;
			}
		})
		.test(
			'number of coupons',
			'Maximum of 10 coupons exceeded.',
			async (value) => {
				if (value) {
					const response = await getCoupons().get();
					if (response.docs.length >= 10) {
						return false;
					} else return true;
				}
			}
		),
});
