import React from 'react';

import { useFirestoreQuery } from 'hooks';
import { getQuizes } from 'utils/firebaseGetters';
import { useApi } from 'contexts';
import {
	AdminPanelHeading,
	Table,
	TableRow,
	TableHead,
	TableCellHead,
	TableCell,
	TableBody,
	TableButton,
	Loader,
	LoaderContainer,
} from 'components';
import {
	CouponMainContainer,
	CouponContainer,
	CouponSpanLength,
} from '../../Coupons/CouponsElements';
const List = () => {
	const { data, loading } = useFirestoreQuery(getQuizes());
	const { deleteQuiz, deleteCoupon } = useApi();

	const onDelete = async (title, code) => {
		await deleteQuiz(title);
		await deleteCoupon(code.toUpperCase());
	};

	return (
		<>
			<CouponMainContainer maxwidth="70rem" minheight="65rem">
				<AdminPanelHeading>Quizzes</AdminPanelHeading>
				<CouponSpanLength>
					{data && data.length + '/10 quizzes'}
				</CouponSpanLength>
				<CouponContainer>
					<Table>
						<TableHead>
							<TableRow fontw="bold">
								<TableCellHead>Name</TableCellHead>
								<TableCellHead>Questions</TableCellHead>
								<TableCellHead>Actions</TableCellHead>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell data-label="Name">SAMPLE QUIZ</TableCell>
								<TableCell data-label="Questions">5</TableCell>
								<TableCell data-label="Actions">DEMO</TableCell>
							</TableRow>
							{data &&
								data.map((el, i) => {
									if (el.title !== 'SAMPLE QUIZ') {
										return (
											<TableRow key={i}>
												<TableCell data-label="Name">
													{el.title}
												</TableCell>
												<TableCell data-label="Questions">
													{Object.keys(el.questions).length}
												</TableCell>
												<TableCell data-label="Actions">
													<TableButton
														primary
														onClick={() =>
															onDelete(el.title, el.coupon.code)
														}
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
				</CouponContainer>
			</CouponMainContainer>
		</>
	);
};

export default List;
