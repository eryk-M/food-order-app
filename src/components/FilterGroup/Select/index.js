import React from 'react';

import {
	SelectForm,
	SelectLabel,
	SelectContent,
	SelectOption,
} from './SelectElements';

const Select = ({ setSort }) => {
	return (
		<SelectForm>
			<SelectLabel>Sort by: </SelectLabel>
			<SelectContent
				onChange={(e) => {
					setSort(e.currentTarget.value);
				}}
			>
				<SelectOption value="default">Default sorting</SelectOption>
				<SelectOption value="popularity">popularity</SelectOption>
				<SelectOption value="average">average rating</SelectOption>
				<SelectOption value="low">price: low to high</SelectOption>
				<SelectOption value="high">price: high to low</SelectOption>
			</SelectContent>
		</SelectForm>
	);
};

export default Select;
