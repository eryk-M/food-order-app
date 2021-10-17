import React from 'react';

import { useFirestoreQuery } from 'hooks';
import { getTopProducts } from 'utils/firebaseGetters';

import {
	TopProductsWrapper,
	TopProductsContainer,
} from './TopProductsElements';

import {
	Loader,
	TopProduct,
	LoaderContainer,
	MainPageHeading,
} from 'components';

const TopProducts = () => {
	const { data, loading } = useFirestoreQuery(getTopProducts());

	return (
		<TopProductsContainer>
			<MainPageHeading upper="Give it a try">
				Top products
			</MainPageHeading>

			<TopProductsWrapper
				loading={String(loading)}
				data-testid="top-products-test"
			>
				{data && data.map((el) => <TopProduct key={el.id} el={el} />)}
				{loading && (
					<LoaderContainer height="15rem">
						<Loader primary />
					</LoaderContainer>
				)}
			</TopProductsWrapper>
		</TopProductsContainer>
	);
};

export default TopProducts;
