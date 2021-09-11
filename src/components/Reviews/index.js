import React, { useEffect, useState, useRef } from 'react';

import FormReview from './FormReview';
import UserReviews from './UserReviews';

import { useApi } from '../../contexts/APIContext';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components/macro';

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

const Reviews = ({ setRatings, productId }) => {
	const { getReviews } = useApi();
	const { currentUser } = useAuth();
	const sectionReviewRef = useRef();

	const [reviews, setReviews] = useState([]);
	const [isAdded, setIsAdded] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getReviews(productId).then((data) => {
			setReviews(data);
			setLoading(false);
			let user;
			if (currentUser) {
				user = data.find((el) => el.userId === currentUser.uid);
			}
			if (user) setIsAdded(true);
		});
	}, [getReviews, productId, currentUser]);

	const pushReviewToArray = (data) => {
		console.log(data);
		setReviews([data, ...reviews]);
	};

	return (
		<ReviewsContainer ref={sectionReviewRef}>
			<ReviewsHeading>Reviews</ReviewsHeading>
			<UserReviews reviews={reviews} loading={loading} />
			<FormReview
				setRatings={setRatings}
				setIsAdded={setIsAdded}
				isAdded={isAdded}
				sectionReviewRef={sectionReviewRef}
				productId={productId}
				pushReviewToArray={pushReviewToArray}
			/>
		</ReviewsContainer>
	);
};

export default Reviews;
