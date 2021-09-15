import React from 'react';

import {
	SortContainer,
	SortForm,
	SortSelect,
	SortOption,
} from './SortElements';

const Sort = () => {
	return (
		<SortContainer>
			<SortForm>
				<SortSelect>
					<SortOption>Default sorting</SortOption>
					<SortOption>Sort by popularity</SortOption>
					<SortOption>Sort by average rating</SortOption>
					<SortOption>Sort by price: low to high</SortOption>
					<SortOption>Sort by price: high to low</SortOption>
				</SortSelect>
			</SortForm>
		</SortContainer>
	);
};

export default Sort;
