import React, { useState } from 'react';

import { LoaderContainer } from 'components/Admin/Containers';
import { AdminPanelHeading } from 'components/Typography';
import {
	CouponContainer,
	CouponFormWrapper,
	CouponMainContainer,
} from './CouponsElements';
import Loader from 'components/Loader';
import { Alert } from 'components/Alert';
import { Form, FormButton } from 'components/Form';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import {
	getCoupons,
	validateCouponCode,
} from 'utils/firebaseGetters';
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableButton,
	TableHead,
	TableCellHead,
} from 'components/Table/TableElements';
import { useApi } from 'contexts/APIContext';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Discount from 'components/Form/Discount';
import Info from 'components/Admin/Info';

const Coupons = () => {
	const { data, loading } = useFirestoreQuery(getCoupons());
	const { addCoupon, deleteCoupon } = useApi();
	const [isLoading, setIsLoading] = useState();
	const [showSuccess, setShowSuccess] = useState(false);

	const validationSchema = Yup.object().shape({
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
			}),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(validationSchema) });

	const onSubmit = async ({ code, discount, fromPrice }) => {
		setIsLoading(true);
		reset();
		await addCoupon(code, discount, fromPrice);
		setIsLoading(false);
		setShowSuccess(true);

		setTimeout(() => {
			setShowSuccess(false);
		}, 4000);
	};

	const onDelete = async (code) => {
		await deleteCoupon(code);
	};
	return (
		<>
			<Info>
				- Quizzes and coupons are working with main page as well. You
				can add, delete quizzes and test them with coupons in user
				panel.
			</Info>
			<CouponMainContainer maxwidth="70rem" minheight="65rem">
				{showSuccess && (
					<Alert right="1rem" top="1rem" success>
						Coupon added
					</Alert>
				)}
				<AdminPanelHeading>Coupons</AdminPanelHeading>
				<CouponContainer>
					<Table>
						<TableHead>
							<TableRow fontW="bold">
								<TableCellHead>Code</TableCellHead>
								<TableCellHead>Percentage</TableCellHead>
								<TableCellHead>From</TableCellHead>
								<TableCellHead>Actions</TableCellHead>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell data-label="Code">DISCOUNT20</TableCell>
								<TableCell data-label="Percentage">20%</TableCell>
								<TableCell data-label="From">$1</TableCell>
								<TableCell data-label="Actions" center></TableCell>
							</TableRow>
							{data &&
								data.map((el, i) => {
									if (el.code !== 'DISCOUNT20') {
										return (
											<TableRow key={i}>
												<TableCell data-label="Code">
													{el.code}
												</TableCell>
												<TableCell data-label="Percentage">
													{el.discount}%
												</TableCell>
												<TableCell data-label="From">
													${el.fromPrice}
												</TableCell>
												<TableCell data-label="Actions">
													<TableButton
														primary
														onClick={() => onDelete(el.code)}
													>
														Delete
													</TableButton>
												</TableCell>
											</TableRow>
										);
									}
									return true;
								})}
						</TableBody>
					</Table>
					{loading && (
						<LoaderContainer height="30rem">
							<Loader primary />
						</LoaderContainer>
					)}
					<CouponFormWrapper>
						<Form onSubmit={handleSubmit(onSubmit)}>
							{/* <FormGroup flex>
							<FormElement>
								<FormLabel>Coupon code</FormLabel>
								<FormInput
									{...register('code')}
									error={errors.code}
									disabled={isLoading}
								/>
								{errors.code && (
									<FormError>{errors.code.message}</FormError>
								)}
							</FormElement>
							<FormElement marginleft="2rem">
								<FormLabel>Discount percent</FormLabel>
								<FormInput
									{...register('discount')}
									type="number"
									error={errors.discount}
									disabled={isLoading}
								/>
								{errors.discount && (
									<FormError>{errors.discount.message}</FormError>
								)}
							</FormElement>
							<FormElement marginleft="2rem">
								<FormLabel>From price</FormLabel>
								<FormInput
									{...register('fromPrice')}
									type="number"
									error={errors.fromPrice}
									disabled={isLoading}
								/>
								{errors.fromPrice && (
									<FormError>{errors.fromPrice.message}</FormError>
								)}
							</FormElement>
						</FormGroup> */}
							<Discount
								isLoading={isLoading}
								register={register}
								errors={errors}
							/>
							<FormButton loading={isLoading} text="Add coupon" />
						</Form>
					</CouponFormWrapper>
				</CouponContainer>
			</CouponMainContainer>
		</>
	);
};

export default Coupons;
