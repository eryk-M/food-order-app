import React from 'react';

import {
	ReviewContainer,
	ReviewForm,
	ReviewNote,
	ReviewFormRating,
	ReviewLabelRating,
	ReviewFormComment,
	ReviewFormCommentLabel,
	ReviewFormCommentText,
	ReviewFormCommentInput,
	ReviewFormCommentBottom,
} from './ReviewElements';

const Review = () => {
	return (
		<ReviewContainer>
			<ReviewForm>
				<ReviewNote>
					Your email address will not be published. Required fields
					are marked *
				</ReviewNote>
				<ReviewFormRating>
					<ReviewLabelRating>Your rating</ReviewLabelRating>
					{/* PLACE FOR REVIEW STAR RATING COMPONENT */}
				</ReviewFormRating>
				<ReviewFormComment>
					<ReviewFormCommentLabel>
						Your review *
					</ReviewFormCommentLabel>
					<ReviewFormCommentText />
				</ReviewFormComment>
				<ReviewFormCommentBottom>
					<ReviewFormComment>
						<ReviewFormCommentLabel>Name *</ReviewFormCommentLabel>
						<ReviewFormCommentInput />
					</ReviewFormComment>
					<ReviewFormComment float>
						<ReviewFormCommentLabel>Email *</ReviewFormCommentLabel>
						<ReviewFormCommentInput />
					</ReviewFormComment>
				</ReviewFormCommentBottom>
			</ReviewForm>
		</ReviewContainer>
	);
};

export default Review;
