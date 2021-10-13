import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import {
	FormReviewContainer,
	FormReviewForm,
	FormReviewNote,
	FormReviewFormRating,
	FormReviewFormComment,
	FormReviewFormCommentBottom,
	AlreadyReviewed,
	FormReviewNotLoggedIn,
} from './FormReviewElements';

import {
	FormInput,
	FormTextArea,
	FormError,
	FormLabel,
	FormElement,
	StarRating,
	Button,
} from 'components';

import { useAuth, useApi } from 'contexts';

import { useForm } from 'react-hook-form';

export const FormReview = ({
	productId,
	sectionReviewRef,
	isAdded,
	setIsAdded,
	setCurrentPage,
}) => {
	const [rating, setRating] = useState(null);
	const [starError, setStarError] = useState(false);

	const history = useHistory();
	const { currentUser } = useAuth();
	const { addReview } = useApi();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			displayName: currentUser?.displayName,
		},
	});
	const onSubmit = async (data) => {
		if (!rating) {
			return setStarError('You need to rate the product!');
		}
		const date = Date.now();

		try {
			await addReview(
				productId,
				currentUser.uid,
				currentUser.displayName,
				date,
				data.body,
				rating
			);
			sectionReviewRef.current.scrollIntoView();
			setCurrentPage(1);
			setStarError('');
			setIsAdded(true);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<FormReviewContainer>
			{isAdded && (
				<AlreadyReviewed>
					You already reviewed this product
				</AlreadyReviewed>
			)}
			{currentUser && !isAdded && (
				<FormReviewForm onSubmit={handleSubmit(onSubmit)}>
					<FormReviewNote>
						Add review and let us know what you think!
					</FormReviewNote>
					<FormReviewFormRating>
						<FormLabel>Your rating*</FormLabel>
						<StarRating setRating={setRating} rating={rating} />
						{starError && (
							<FormError>You need to rate this product</FormError>
						)}
					</FormReviewFormRating>
					<FormReviewFormCommentBottom>
						<FormElement>
							<FormLabel>Name</FormLabel>
							<FormInput
								{...register('displayName')}
								disabled={true}
							/>
						</FormElement>
					</FormReviewFormCommentBottom>
					<FormReviewFormComment>
						<FormLabel>Your review*</FormLabel>
						<FormTextArea
							{...register('body', {
								required: 'Text required here',
								maxLength: {
									value: 800,
									message: 'You have reached max length',
								},
							})}
							error={errors.body}
						/>
						{errors.body && (
							<FormError>{errors.body.message}</FormError>
						)}
					</FormReviewFormComment>
					<Button width="100%">Add review</Button>
				</FormReviewForm>
			)}
			{!currentUser && (
				<FormReviewNotLoggedIn>
					{' '}
					You need to login first! Go to{' '}
					<Link
						to={{
							pathname: '/login',
							query: history.location.pathname,
						}}
					>
						Login page
					</Link>
				</FormReviewNotLoggedIn>
			)}
		</FormReviewContainer>
	);
};
