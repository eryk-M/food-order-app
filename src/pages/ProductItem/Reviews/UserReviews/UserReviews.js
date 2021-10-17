import React from 'react';

import {
	UserReviewsContainer,
	UserReview,
	UserReviewName,
	UserReviewTime,
	UserReviewRating,
	UserReviewBody,
	UserReviewNoItems,
} from './UserReviewsElements';
import { Loader, StarRating } from 'components';
import { timeDifference } from 'utils/timeDifference';

export const UserReviews = ({
	indexOfFirstItem,
	indexOfLastItem,
	reviews,
	loading,
}) => {
	const dateNow = Date.now();
	return (
		<UserReviewsContainer className="user">
			{loading && <Loader margincenter primary high="true" />}
			{reviews &&
				reviews
					.slice(indexOfFirstItem, indexOfLastItem)
					.map((review, i) => (
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
