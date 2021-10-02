import React, { useEffect, useState, useRef } from 'react';

import FormReview from './FormReview';
import UserReviews from './UserReviews';

import { useAuth } from 'contexts/AuthContext';
import styled from 'styled-components/macro';
import Loader from 'components/Loader';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getReviews } from 'utils/firebaseGetters';

const ReviewsContainer = styled.section`
	background-color: #93949417;
	padding-bottom: 3rem;
`;

const ReviewsHeading = styled.h2`
	text-align: center;
	font-size: 2.6rem;
	padding-top: 3rem;
	margin-bottom: 3rem;
`;

const Reviews = ({ productId }) => {
	const { currentUser } = useAuth();
	const sectionReviewRef = useRef();
	const [isAdded, setIsAdded] = useState(false);

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
			<UserReviews reviews={data} loading={loading} />

			<FormReview
				setIsAdded={setIsAdded}
				isAdded={isAdded}
				sectionReviewRef={sectionReviewRef}
				productId={productId}
			/>
		</ReviewsContainer>
	);
};

export default Reviews;
