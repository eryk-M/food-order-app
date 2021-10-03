import React, { useState, lazy, Suspense } from 'react';

import SideBar from './SideBar';
import SearchForm from './SearchForm';

import {
	ProductsContainer,
	ProductsSearchWrapper,
	SearchContainer,
} from './ProductsElements';

import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { useWindowSize } from 'hooks/useWindowSize';
import { getAllProducts } from 'utils/firebaseGetters';
import Search from 'components/FilterGroup/Search';
import Select from 'components/FilterGroup/Select';
import Loader from 'components/Loader';

const Content = lazy(() => import('./Content'));

const Products = () => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(40);
	const [category, setCategory] = useState('All');
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('');
	const size = useWindowSize();

	const { data } = useFirestoreQuery(getAllProducts());

	const { width } = size;

	return (
		<ProductsContainer>
			<SearchForm
				price={{
					minPrice: minPrice,
					maxPrice: maxPrice,
					setMaxPrice,
					setMinPrice,
				}}
				query={query}
				setQuery={setQuery}
				setSort={setSort}
			/>
			<ProductsSearchWrapper className="products">
				<SideBar setCategory={setCategory} />

				{width <= 640 && (
					<SearchContainer>
						<Search
							query={query}
							tooltip={false}
							setQuery={setQuery}
							placeholder="Search by name"
						/>
						<Select setSort={setSort} />
					</SearchContainer>
				)}
				<Suspense fallback={<Loader primary margincenter veryhigh />}>
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
				</Suspense>
			</ProductsSearchWrapper>
		</ProductsContainer>
	);
};

export default Products;
