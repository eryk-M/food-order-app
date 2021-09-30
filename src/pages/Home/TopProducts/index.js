import React from 'react';

import TopProduct from 'components/TopProduct';
import { MainPageHeading } from 'components/Typography';
import { useFirestoreQuery } from 'hooks/useFirestoreQuery';
import { getTopProducts } from 'utils/firebaseGetters';

import {
	TopProductsWrapper,
	TopProductsContainer,
} from './TopProductsElements';

import { LoaderContainer } from 'components/Admin/Containers';
import Loader from 'components/Loader';
const TopProducts = () => {
	const { data, loading } = useFirestoreQuery(getTopProducts());

	return (
		<TopProductsContainer>
			<MainPageHeading upper="Give it a try">
				Top products
			</MainPageHeading>

			<TopProductsWrapper loading={String(loading)}>
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
