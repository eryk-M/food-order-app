import React, { useState } from 'react';

import SideBar from './SideBar';
import Content from './Content';
import SearchForm from './SearchForm';

import {
	ProductsContainer,
	ProductsSearchWrapper,
} from './ProductsElements';

const Products = () => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(40);

	return (
		<ProductsContainer>
			<SearchForm
				price={{
					minPrice: minPrice,
					maxPrice: maxPrice,
					setMaxPrice,
					setMinPrice,
				}}
			/>
			<ProductsSearchWrapper>
				<SideBar />
				<Content />
			</ProductsSearchWrapper>
		</ProductsContainer>
	);
};

export default Products;
