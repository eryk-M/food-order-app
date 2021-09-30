import React from 'react';

import {
	Form,
	FormInput,
	FormElement,
} from 'components/Form/FormElements';
import { BsSearch } from 'react-icons/bs';
import { SearchContainer, SearchHint } from './SearchElements';
const Search = ({ query, setQuery, width, placeholder }) => {
	return (
		<SearchContainer width={width} query={query}>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormElement>
					<BsSearch className="search-icon" />
					<FormInput
						type="text"
						placeholder={placeholder}
						onChange={(e) => {
							setQuery(e.currentTarget.value);
						}}
					/>
					<SearchHint query={query}>
						Type at least 3 letters
					</SearchHint>
				</FormElement>
			</Form>
		</SearchContainer>
	);
};

export default Search;
