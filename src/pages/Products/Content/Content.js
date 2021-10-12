import React from 'react';

import { ContentList } from './ContentElements';

import { ProductsItem } from 'pages';

const Content = ({
	data,
	searchQuery: { sort, query, category, minPrice, maxPrice },
}) => {
	//SORTING BY POPULARITY:
	//Popularity of product is incrementing when user order product or add review
	const sortFunction = (a, b) => {
		switch (sort) {
			case 'default':
				return;
			case 'low':
				return a.price - b.price;
			case 'high':
				return b.price - a.price;
			case 'average':
				return b.avgRating - a.avgRating;
			case 'popularity':
				return b.popularity - a.popularity;
			default:
				break;
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
		<ContentList data-testid="products-content-test">
			{data &&
				data
					.filter((el) => filterCategory(el))
					.filter((el) => filterPrice(el))
					.filter((el) => filterQuery(el))
					.sort((a, b) => sortFunction(a, b))
					.map((el) => <ProductsItem key={el.id} el={el} />)}
		</ContentList>
	);
};

export default Content;
