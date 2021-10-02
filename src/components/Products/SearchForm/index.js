import React from 'react';

import { SearchFormContainer } from './SearchFormElements';

import Search from 'components/FilterGroup/Search';
import PriceFilter from 'components/FilterGroup/PriceFilter';
import Select from 'components/FilterGroup/Select';

const SearchForm = ({ price, query, setQuery, setSort, tooltip }) => {
	return (
		<SearchFormContainer>
			<Search
				query={query}
				tooltip={false}
				setQuery={setQuery}
				placeholder="Search by name"
			/>
			<Select setSort={setSort} />
			<PriceFilter price={price} />
		</SearchFormContainer>
	);
};

export default SearchForm;
