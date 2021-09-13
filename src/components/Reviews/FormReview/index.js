import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import {
	FormReviewContainer,
	FormReviewForm,
	FormReviewNote,
	FormReviewFormRating,
	FormReviewLabelRating,
	FormReviewFormComment,
	FormReviewFormCommentLabel,
	FormReviewFormCommentBottom,
} from './FormReviewElements';

import Button from '../../Button';
import { FormInput, FormTextArea } from '../../Form/FormElements';

import StarRating from './StarRating';

import { useAuth } from '../../../contexts/AuthContext';
import { useApi } from '../../../contexts/APIContext';

const FormReview = ({
	productId,
	pushReviewToArray,
	sectionReviewRef,
	isAdded,
	setIsAdded,
	setRatings,
}) => {
	const [rating, setRating] = useState(null);
	const [reviewBody, setReviewBody] = useState('');
	const [starError, setStarError] = useState(false);

	const history = useHistory();
	const { currentUser } = useAuth();
	const { addReview } = useApi();

	const handleChangeInput = (e) => {
		setReviewBody(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!rating) {
			return setStarError('You need to rate the product!');
		}

		const date = Date.now();

		try {
			addReview(
				productId,
				currentUser.uid,
				currentUser.displayName,
				date,
				reviewBody,
				rating
			).then(() => {
				sectionReviewRef.current.scrollIntoView();
				pushReviewToArray({
					body: reviewBody,
					date: date,
					rating: rating,
					userId: currentUser.uid,
					userName: currentUser.displayName,
				});
				setStarError('');
				setIsAdded(true);
			});
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<FormReviewContainer>
			{isAdded && 'You already review this product'}
			{/* TODO: DODAJ !isAdded na dole jak zrobisz!! */}
			{currentUser && (
				<FormReviewForm onSubmit={(e) => handleSubmit(e)}>
					<FormReviewNote>
						Add review and let us know what you think!
					</FormReviewNote>
					<FormReviewFormRating>
						<FormReviewLabelRating>
							Your rating *
						</FormReviewLabelRating>
						<StarRating setRating={setRating} rating={rating} />
						{starError && (
							<span
								style={{
									margin: '1rem 0',
									color: 'var(--color-red)',
									fontSize: '1.4rem',
									display: 'block',
								}}
							>
								{starError}
							</span>
						)}
					</FormReviewFormRating>
					<FormReviewFormCommentBottom>
						<FormReviewFormComment>
							<FormReviewFormCommentLabel>
								Name
							</FormReviewFormCommentLabel>
							<FormInput
								defaultValue={currentUser.displayName}
								disabled={currentUser ?? 'true'}
								required
								minLength="2"
								maxLength="14"
							/>
						</FormReviewFormComment>
					</FormReviewFormCommentBottom>
					<FormReviewFormComment>
						<FormReviewFormCommentLabel>
							Your review *
						</FormReviewFormCommentLabel>
						<FormTextArea
							required
							maxLength="800"
							onChange={(e) => handleChangeInput(e)}
						/>
					</FormReviewFormComment>
					<Button width="100%">Add review</Button>
				</FormReviewForm>
			)}
			{!currentUser && (
				<div style={{ fontSize: '3rem' }}>
					<Link
						to={{
							pathname: '/login',
							query: history.location.pathname,
						}}
					>
						Login page
					</Link>
				</div>
			)}
		</FormReviewContainer>
	);
};

export default FormReview;
