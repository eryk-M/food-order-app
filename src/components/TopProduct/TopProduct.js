import React from 'react';

import {
	TopProductContainer,
	TopProductPrice,
	TopProductImage,
	TopProductInfo,
	TopProductHeading,
	TopProductIngs,
	TopProductDesc,
	TopProductOrder,
	TopProductStars,
	TopProductImageWrapper,
} from './TopProductElements';

import { StarRating } from 'components';

export const TopProduct = ({ el }) => {
	const renderIngredients = (ings) => {
		return ings.slice(0, 4).join(' / ');
	};
	return (
		<TopProductContainer>
			{el.avgRating > 0 && (
				<TopProductStars>
					<StarRating rating={el.avgRating} size={15} show />
				</TopProductStars>
			)}

			<TopProductPrice>
				${el.discountPrice !== 0 ? el.discountPrice : el.price}
			</TopProductPrice>
			<TopProductImageWrapper>
				<TopProductImage
					effect="blur"
					src={el.img}
					alt={el.name}
					width="100%"
				/>
			</TopProductImageWrapper>

			<TopProductInfo>
				<TopProductHeading>{el.name}</TopProductHeading>
				<TopProductIngs>
					{renderIngredients(el.ingredients)}
				</TopProductIngs>
				<TopProductDesc>{el.desc}</TopProductDesc>
				<TopProductOrder to={`product/${el.id}`}>
					Order now
				</TopProductOrder>
			</TopProductInfo>
		</TopProductContainer>
	);
};
