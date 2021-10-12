import * as Yup from 'yup';
import {
	validateCouponCode,
	getCoupons,
} from 'utils/firebaseGetters';

export const validationSchema = Yup.object().shape({
	discount: Yup.string()
		.required('Discount is required')
		.test(
			'discount',
			'Number must be from 1 to 99',
			(value) => value > 0 && value < 100
		),
	fromPrice: Yup.string()
		.required('Price is required')
		.test(
			'fromPrice',
			'Number must be from 1 to 200',
			(value) => value > 0 && value < 200
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
