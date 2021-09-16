import React, { useState, useEffect } from 'react';

import SideBar from './SideBar';
import Content from './Content';
import SearchForm from './SearchForm';

import {
	ProductsContainer,
	ProductsSearchWrapper,
} from './ProductsElements';

import { useApi } from 'contexts/APIContext';

const Products = () => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(40);
	const [data, setData] = useState([]);
	const [category, setCategory] = useState('All');
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('');

	const { getProducts } = useApi();

	useEffect(() => {
		const controller = new AbortController();
		if (data.length === 0) {
			getProducts().then((data) => {
				setData(data);
			});
		}
		return () => controller.abort();
	}, [getProducts, data]);

	return (
		<ProductsContainer>
			<SearchForm
				price={{
					minPrice: minPrice,
					maxPrice: maxPrice,
					setMaxPrice,
					setMinPrice,
				}}
				setQuery={setQuery}
				setSort={setSort}
			/>
			<ProductsSearchWrapper>
				<SideBar setCategory={setCategory} />
				<Content
					data={data}
					searchQuery={{
						query: query,
						category: category,
						sort: sort,
						minPrice: minPrice,
						maxPrice: maxPrice,
					}}
				/>
			</ProductsSearchWrapper>
		</ProductsContainer>
	);
};

export default Products;
