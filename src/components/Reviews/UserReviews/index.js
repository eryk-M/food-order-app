import React from 'react';

import StarRating from '../FormReview/StarRating';

import {
	UserReviewsContainer,
	UserReview,
	UserReviewName,
	UserReviewTime,
	UserReviewRating,
	UserReviewBody,
	UserReviewNoItems,
} from './UserReviewsElements';

import Loader from 'components/Loader';
import { timeDifference } from 'utils/timeDifference';
const UserReviews = ({ reviews, loading }) => {
	const dateNow = Date.now();

	return (
		<UserReviewsContainer className="user">
			{loading && <Loader margincenter primary high="true" />}
			{reviews &&
				reviews.map((review, i) => (
					<UserReview key={i}>
						<UserReviewName>{review.userName}</UserReviewName>
						<UserReviewTime>
							{timeDifference(dateNow, review.date)}
						</UserReviewTime>
						<UserReviewRating>
							<StarRating rating={review.rating} show />
						</UserReviewRating>
						<UserReviewBody>{review.body}</UserReviewBody>
					</UserReview>
				))}
			{reviews?.length === 0 && !loading && (
				<UserReviewNoItems>
					There are no reviews yet. Be first and add review in form
					below.
				</UserReviewNoItems>
			)}
		</UserReviewsContainer>
	);
};

export default UserReviews;
