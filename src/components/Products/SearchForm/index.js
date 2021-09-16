import React from 'react';

import { SearchFormContainer } from './SearchFormElements';

import Search from 'components/FilterGroup/Search';
import PriceFilter from 'components/FilterGroup/PriceFilter';
import Select from 'components/FilterGroup/Select';

const SearchForm = ({ price, setQuery, setSort }) => {
	return (
		<SearchFormContainer>
			<Search setQuery={setQuery} />
			<Select setSort={setSort} />
			<PriceFilter price={price} />
		</SearchFormContainer>
	);
};

export default SearchForm;
