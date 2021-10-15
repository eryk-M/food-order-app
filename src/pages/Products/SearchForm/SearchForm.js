import React from 'react';

import { SearchFormContainer } from './SearchFormElements';
import { Search, Select, PriceFilter } from 'components';
import { useWindowSize } from 'hooks';
const SearchForm = ({ price, query, setQuery, setSort, tooltip }) => {
	const { width } = useWindowSize();

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
