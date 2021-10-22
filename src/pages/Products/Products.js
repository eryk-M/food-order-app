import React, { useState, lazy, Suspense } from 'react';

import { ProductsSideBar, ProductsSearchForm } from 'pages';
import {
	ProductsContainer,
	ProductsSearchWrapper,
	SearchContainer,
} from './ProductsElements';

import { useFirestoreQuery, useWindowSize } from 'hooks';
import { getAllProducts } from 'utils/firebaseGetters';
import { Search, Select, Loader } from 'components';

const Content = lazy(() => import('./Content/Content'));

export const Products = () => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(40);
	const [category, setCategory] = useState('All');
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('');
	const { width } = useWindowSize();
	const { data } = useFirestoreQuery(getAllProducts());

	return (
		<ProductsContainer>
			<ProductsSearchForm
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
				<ProductsSideBar setCategory={setCategory} />

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
