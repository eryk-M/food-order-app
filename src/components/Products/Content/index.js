import React from 'react';

import {
	ContentContainer,
	ContentItem,
	ContentItemImage,
	ContentItemInfo,
	ContentItemHeading,
	ContentItemDesc,
	ContentItemButton,
	ContentItemPrice,
	ContentItemImageWrapper,
} from './ContentElements';

import {
	ProductButton,
	ProductCartIcon,
} from 'components/ProductItem/ProductItemElements';

import { Link } from 'react-router-dom';

import StarRating from 'components/Reviews/FormReview/StarRating';

const Content = ({
	data,
	searchQuery: { sort, query, category, minPrice, maxPrice },
}) => {
	//TODO: SORT BY POPULARITY
	const sortFunction = (a, b) => {
		if (sort === 'default') {
			return true;
		} else if (sort === 'low') {
			return a.price - b.price;
		} else if (sort === 'high') {
			return b.price - a.price;
		} else if (sort === 'average') {
			return b.avgRating - a.avgRating;
		}
	};

	const filterQuery = (el) => {
		if (query === '') {
			return el;
		} else {
			return el.name.toLowerCase().includes(query.toLowerCase());
		}
	};

	const filterPrice = (el) =>
		el.price <= maxPrice && el.price >= minPrice;

	const filterCategory = (el) => {
		if (category === 'All') {
			return el;
		} else {
			return el.category === category;
		}
	};

	return (
		<ContentContainer>
			{data &&
				data
					.filter((el) => filterCategory(el))
					.filter((el) => filterPrice(el))
					.filter((el) => filterQuery(el))
					.sort((a, b) => sortFunction(a, b))
					.map((el) => (
						<ContentItem key={el.id}>
							<ContentItemImageWrapper>
								<Link to={`/product/${el.id}`}>
									<ContentItemImage src={el.img} alt={el.alt} />
								</Link>
							</ContentItemImageWrapper>
							<ContentItemInfo>
								<Link to={`/product/${el.id}`}>
									<ContentItemHeading>{el.name}</ContentItemHeading>
								</Link>
								<ContentItemPrice>${el.price}</ContentItemPrice>
								<StarRating rating={el.avgRating} size={15} show />
								<ContentItemDesc>{el.desc}</ContentItemDesc>
								<ContentItemButton>
									<ProductButton>
										<ProductCartIcon />
										Add to cart
									</ProductButton>
								</ContentItemButton>
							</ContentItemInfo>
						</ContentItem>
					))}
		</ContentContainer>
	);
};

export default Content;
