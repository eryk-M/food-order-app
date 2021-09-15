import React from 'react';

import {
	Form,
	FormLabel,
	FormInput,
	FormElement,
} from 'components/Form/FormElements';

import { SearchContainer } from './SearchElements';
const Search = () => {
	return (
		<SearchContainer>
			<Form>
				<FormElement>
					<FormLabel>Search products</FormLabel>
					<FormInput />
				</FormElement>
			</Form>
		</SearchContainer>
	);
};

export default Search;
