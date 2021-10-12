import * as Yup from 'yup';

export const validationSchema = (
	validateQuizCode,
	validateDiscountCode,
	currentUser
) =>
	Yup.object().shape({
		discount: Yup.string()
			.test(
				'discount',
				'Discount code is not valid!',
				async (value) => {
					const response = await validateDiscountCode(value);
					return !response.empty;
				}
			)
			.test(
				'discount',
				'You have to be logged in to use this code',
				async (value) => {
					const response = await validateDiscountCode(value);
					if (!response.empty) {
						const checkCode = response.docs[0].data();
						if (checkCode.quiz && !currentUser) {
							return false;
						} else {
							return true;
						}
					} else {
						return true;
					}
				}
			)
			.test('discount', 'You cant use this code', async (value) => {
				if (currentUser) {
					const response = await validateQuizCode(currentUser.uid);
					const user = response.data();
					return !user.usedCoupons.some((el) => el.code === value);
				} else {
					return true;
				}
			}),
	});
