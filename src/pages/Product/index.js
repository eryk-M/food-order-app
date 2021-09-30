import React, { lazy, Suspense } from 'react';

// import ProductItem from 'components/ProductItem';
import Loader from 'components/Loader';
const ProductItem = lazy(() => import('components/ProductItem'));
const Product = (props) => {
	return (
		<Suspense fallback={<Loader margincenter veryhigh primary />}>
			<ProductItem props={props} />
		</Suspense>
	);
};

export default Product;
