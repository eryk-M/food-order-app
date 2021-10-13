import React, { useState, useRef, useEffect } from 'react';

import {
	CouponContainer,
	CouponFormWrapper,
	CouponMainContainer,
	CouponSpanLength,
} from './CouponsElements';
import {
	Loader,
	Info,
	LoaderContainer,
	Form,
	FormButton,
	Discount,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableButton,
	TableHead,
	TableCellHead,
	Alert,
	AdminPanelHeading,
} from 'components';
import { useFirestoreQuery } from 'hooks';
import { getCoupons } from 'utils/firebaseGetters';

import { useApi } from 'contexts';

//FORM
import { useForm } from 'react-hook-form';
import { validationSchema } from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const Coupons = () => {
	const { data, loading } = useFirestoreQuery(getCoupons());
	const { addCoupon, deleteCoupon } = useApi();
	const [isLoading, setIsLoading] = useState();
	const [showSuccess, setShowSuccess] = useState(false);

	const timeoutRef = useRef();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(validationSchema) });

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
			setIsLoading(false);
		};
	}, []);
	const onSubmit = async ({ code, discount, fromPrice }) => {
		setIsLoading(true);
		reset();
		await addCoupon(code, discount, fromPrice);
		setIsLoading(false);
		setShowSuccess(true);
		const timeout = setTimeout(() => {
			setShowSuccess(false);
		}, 4000);
		timeoutRef.current = timeout;
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
				<CouponSpanLength>
					{data && data.length + '/10 coupons'}
				</CouponSpanLength>
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
								<TableCell data-label="Actions">DEMO</TableCell>
							</TableRow>
							<TableRow>
								<TableCell data-label="Code">SAMPLE10</TableCell>
								<TableCell data-label="Percentage">10%</TableCell>
								<TableCell data-label="From">$1</TableCell>
								<TableCell data-label="Actions">DEMO</TableCell>
							</TableRow>
							{data &&
								data.map((el, i) => {
									if (
										el.code !== 'DISCOUNT20' &&
										el.code !== 'SAMPLE10'
									) {
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
