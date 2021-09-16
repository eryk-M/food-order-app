import React from 'react';

import {
	Form,
	FormInput,
	FormElement,
} from 'components/Form/FormElements';
import { BsSearch } from 'react-icons/bs';
import { SearchContainer } from './SearchElements';
const Search = ({ setQuery }) => {
	return (
		<SearchContainer>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormElement>
					<BsSearch className="search-icon" />
					<FormInput
						type="text"
						placeholder="Search products"
						onChange={(e) => {
							setQuery(e.currentTarget.value);
						}}
					/>
				</FormElement>
			</Form>
		</SearchContainer>
	);
};

export default Search;
