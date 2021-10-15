import React, { useEffect, useState, useRef } from 'react';

import { FormReview, UserReviews } from 'pages';
import { useAuth } from 'contexts';
import styled from 'styled-components/macro';
import { useFirestoreQuery, usePagination } from 'hooks';
import { Pagination } from 'components';
import { getReviews } from 'utils/firebaseGetters';

const ReviewsContainer = styled.section`
	background-color: var(--color-background-grey-light);
	padding-bottom: 3rem;
	position: relative;
`;
const ReviewsPaginationContainer = styled.div`
	max-width: 80rem;
	position: relative;
	margin: 0 auto;
`;

const ReviewsHeading = styled.h2`
	text-align: center;
	font-size: 2.6rem;
	padding-top: 3rem;
	margin-bottom: 3rem;
`;

export const Reviews = ({ productId }) => {
	const { currentUser } = useAuth();
	const sectionReviewRef = useRef();
	const [isAdded, setIsAdded] = useState(false);
	const {
		itemsPerPage,
		paginate,
		currentPage,
		indexOfFirstItem,
		indexOfLastItem,
		setCurrentPage,
	} = usePagination(5);
	const { data, loading } = useFirestoreQuery(getReviews(productId));

	useEffect(() => {
		if (currentUser) {
			const user = data?.some((el) => el.userId === currentUser.uid);
			if (user) setIsAdded(true);
		}
	}, [data, currentUser]);

	return (
		<ReviewsContainer ref={sectionReviewRef}>
			<ReviewsHeading>Reviews</ReviewsHeading>

			{data?.length > 5 && (
				<ReviewsPaginationContainer>
					<Pagination
						top="-6rem"
						left="unset"
						right="-4.7rem"
						itemsPerPage={itemsPerPage}
						totalItems={data?.length}
						paginate={paginate}
						currentPage={currentPage}
						query=""
					/>
				</ReviewsPaginationContainer>
			)}

			<UserReviews
				indexOfFirstItem={indexOfFirstItem}
				indexOfLastItem={indexOfLastItem}
				reviews={data}
				loading={loading}
			/>

			<FormReview
				setCurrentPage={setCurrentPage}
				length={data?.length}
				setIsAdded={setIsAdded}
				isAdded={isAdded}
				sectionReviewRef={sectionReviewRef}
				productId={productId}
			/>
		</ReviewsContainer>
	);
};
