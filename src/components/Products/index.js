import React, { useState } from 'react';

import SideBar from './SideBar';
import Content from './Content';
import SearchForm from './SearchForm';

import {
	ProductsContainer,
	ProductsSearchWrapper,
} from './ProductsElements';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getAllProducts } from 'utils/firebaseGetters';

import Loader from 'components/Loader';

const Products = () => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(40);
	const [category, setCategory] = useState('All');
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('');

	const { data, loading } = useFirestoreQuery(getAllProducts());
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
			<ProductsSearchWrapper className="products">
				<SideBar setCategory={setCategory} />
				{loading ? (
					<Loader primary />
				) : (
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
				)}
			</ProductsSearchWrapper>
		</ProductsContainer>
	);
};

export default Products;
