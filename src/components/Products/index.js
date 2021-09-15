import React from 'react';

import SideBar from './SideBar';
import Content from './Content';
import Sort from './Sort';

import {
	ProductsContainer,
	ProductsSearchWrapper,
} from './ProductsElements';

const Products = () => {
	return (
		<ProductsContainer>
			<Sort />
			<ProductsSearchWrapper>
				<SideBar />
				<Content />
			</ProductsSearchWrapper>
		</ProductsContainer>
	);
};

export default Products;
