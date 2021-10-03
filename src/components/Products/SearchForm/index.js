import React from 'react';

import { SearchFormContainer } from './SearchFormElements';

import Search from 'components/FilterGroup/Search';
import PriceFilter from 'components/FilterGroup/PriceFilter';
import Select from 'components/FilterGroup/Select';
import { useWindowSize } from 'hooks/useWindowSize';
const SearchForm = ({ price, query, setQuery, setSort, tooltip }) => {
	const size = useWindowSize();

	const { width } = size;
	return (
		<SearchFormContainer>
			{width > 640 && (
				<>
					<Search
						query={query}
						tooltip={false}
						setQuery={setQuery}
						placeholder="Search by name"
					/>
					<Select setSort={setSort} />
				</>
			)}
			<PriceFilter price={price} />
		</SearchFormContainer>
	);
};

export default SearchForm;
