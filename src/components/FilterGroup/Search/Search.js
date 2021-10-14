import React from 'react';

import { Form, FormInput, FormElement } from 'components';
import { BsSearch } from 'react-icons/bs';
import { SearchContainer, SearchHint } from './SearchElements';

export const Search = ({
	query,
	setQuery,
	width,
	placeholder,
	tooltip,
}) => {
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
					{tooltip && (
						<SearchHint query={query}>
							Type at least 3 letters
						</SearchHint>
					)}
				</FormElement>
			</Form>
		</SearchContainer>
	);
};