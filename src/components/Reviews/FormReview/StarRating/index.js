import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import styled from 'styled-components/macro';
import ReactStars from 'react-rating-stars-component';

export const StarIcon = styled(FaStar)`
	transition: color 0.2s;
	margin-right: 0.5rem;
`;

export const StarHalfIcon = styled(FaStarHalfAlt)`
	transition: color 0.2s;
	margin-right: 0.5rem;
`;

const StarRating = ({ setRating, setStarError, starError }) => {
	const ratingChanged = (newRating) => {
		setStarError('');
		setRating(newRating);
	};

	const starSettings = {
		size: 25,
		value: 0,
		onChange: ratingChanged,
		count: 5,
		activeColor: '#ffc107',
		color: '#e4e5e9',
		emptyIcon: <StarIcon />,
		filledIcon: <StarIcon />,
	};

	return (
		<div
			className={starError ? 'stars-error' : ''}
			style={{ margin: '1rem 0', display: 'inline-block' }}
		>
			<ReactStars {...starSettings} />
		</div>
	);
};

export default StarRating;
