import React from 'react';

import {
	Form,
	FormInput,
	FormElement,
} from 'components/Form/FormElements';
import { BsSearch } from 'react-icons/bs';
import { SearchContainer } from './SearchElements';
const Search = () => {
	return (
		<SearchContainer>
			<Form>
				<FormElement>
					<BsSearch />
					<FormInput placeholder="Search products" />
				</FormElement>
			</Form>
		</SearchContainer>
	);
};

export default Search;
