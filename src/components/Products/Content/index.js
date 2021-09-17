import React from 'react';

import { ContentList } from './ContentElements';

import Item from './Item';

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
		<ContentList>
			{data &&
				data
					.filter((el) => filterCategory(el))
					.filter((el) => filterPrice(el))
					.filter((el) => filterQuery(el))
					.sort((a, b) => sortFunction(a, b))
					.map((el) => <Item key={el.id} el={el} />)}
		</ContentList>
	);
};

export default Content;
