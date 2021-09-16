import React from 'react';

import {
	SearchFormContainer,
	SearchFormForm,
	SearchFormSelect,
	SearchFormOption,
	SearchFormLabel,
} from './SearchFormElements';

import Search from './Search';
import PriceFilter from './PriceFilter';

const SearchForm = ({ price }) => {
	return (
		<SearchFormContainer>
			<Search />
			<SearchFormForm>
				<SearchFormLabel>Sort by: </SearchFormLabel>
				<SearchFormSelect>
					<SearchFormOption>Default sorting</SearchFormOption>
					<SearchFormOption>popularity</SearchFormOption>
					<SearchFormOption>average rating</SearchFormOption>
					<SearchFormOption>price: low to high</SearchFormOption>
					<SearchFormOption>price: high to low</SearchFormOption>
				</SearchFormSelect>
			</SearchFormForm>
			<PriceFilter price={price} />
		</SearchFormContainer>
	);
};

export default SearchForm;
