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

import Loader from '../../Loader';

const UserReviews = ({ reviews, loading }) => {
	const dateNow = Date.now();

	return (
		<UserReviewsContainer className="user">
			{loading && <Loader />}
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
			{reviews.length === 0 && !loading && (
				<UserReviewNoItems>
					There is no reviews yet. Be first and add review in form
					below.
				</UserReviewNoItems>
			)}
		</UserReviewsContainer>
	);
};

export default UserReviews;

function timeDifference(current, previous) {
	const msPerMinute = 60 * 1000;
	const msPerHour = msPerMinute * 60;
	const msPerDay = msPerHour * 24;
	const msPerMonth = msPerDay * 30;
	const msPerYear = msPerDay * 365;

	const elapsed = current - previous;

	if (elapsed < msPerMinute) {
		return Math.round(elapsed / 1000) + ' seconds ago';
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + ' minutes ago';
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + ' hours ago';
	} else if (elapsed < msPerMonth) {
		return (
			'approximately ' + Math.round(elapsed / msPerDay) + ' days ago'
		);
	} else if (elapsed < msPerYear) {
		return (
			'approximately ' +
			Math.round(elapsed / msPerMonth) +
			' months ago'
		);
	} else {
		return (
			'approximately ' +
			Math.round(elapsed / msPerYear) +
			' years ago'
		);
	}
}
