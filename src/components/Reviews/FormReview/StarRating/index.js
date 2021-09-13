import React, { useState, useEffect } from 'react';

import { StarLabel, StarInput, StarIcon } from './StarRatingElements';

const StarRating = ({ rating, setRating, show }) => {
	const [hover, setHover] = useState(null);

	useEffect(() => {
		if (rating && !show) {
			setRating(rating);
		}
	}, [rating, setRating, show]);

	return (
		<div>
			{[...Array(5)].map((star, i) => {
				const ratingValue = i + 1;

				return (
					<StarLabel key={i}>
						<StarInput
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={() => (show ? null : setRating(ratingValue))}
						/>
						<StarIcon
							color={
								ratingValue <= (hover || rating)
									? '#ffc107'
									: '#e4e5e9'
							}
							size={25}
							onMouseEnter={() =>
								show ? null : setHover(ratingValue)
							}
							onMouseLeave={() => (show ? null : setHover(null))}
							show={`${show}`}
						/>
					</StarLabel>
				);
			})}
		</div>
	);
};

export default StarRating;
