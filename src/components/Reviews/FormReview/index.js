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
import {
	FormInput,
	FormTextArea,
	FormError,
} from '../../Form/FormElements';

import StarRating from './StarRating';

import { useAuth } from '../../../contexts/AuthContext';
import { useApi } from '../../../contexts/APIContext';

import { useForm } from 'react-hook-form';

const FormReview = ({
	productId,
	pushReviewToArray,
	sectionReviewRef,
	isAdded,
	setIsAdded,
}) => {
	const [rating, setRating] = useState(null);
	const [starError, setStarError] = useState(false);

	const history = useHistory();
	const { currentUser } = useAuth();
	const { addReview } = useApi();

	//HOOK FORM
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			displayName: currentUser.displayName,
		},
	});
	const onSubmit = (data) => {
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
				data.body,
				rating
			).then(() => {
				sectionReviewRef.current.scrollIntoView();
				pushReviewToArray({
					body: data.body,
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
				<FormReviewForm onSubmit={handleSubmit(onSubmit)}>
					<FormReviewNote>
						Add review and let us know what you think!
					</FormReviewNote>
					<FormReviewFormRating>
						<FormReviewLabelRating>
							Your rating *
						</FormReviewLabelRating>
						<StarRating setRating={setRating} rating={rating} />
						{starError && (
							<FormError>You need to rate this product</FormError>
						)}
					</FormReviewFormRating>
					<FormReviewFormCommentBottom>
						<FormReviewFormComment>
							<FormReviewFormCommentLabel>
								Name
							</FormReviewFormCommentLabel>
							<FormInput
								{...register('displayName')}
								disabled={true}
							/>
						</FormReviewFormComment>
					</FormReviewFormCommentBottom>
					<FormReviewFormComment>
						<FormReviewFormCommentLabel>
							Your review *
						</FormReviewFormCommentLabel>
						<FormTextArea
							{...register('body', {
								required: 'Text required here',
								maxLength: {
									value: 800,
									message: 'You have reached max length',
								},
							})}
						/>
						{errors.body && (
							<FormError>{errors.body.message}</FormError>
						)}
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
