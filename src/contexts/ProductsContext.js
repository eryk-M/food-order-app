import React, { useState, createContext } from 'react';

//TEST
import { data } from '../components/Products/dummyData';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
	data.forEach((el) => (el.quantity = 1));

	const [products, setProducts] = useState(data);

	return (
		<ProductsContext.Provider value={products}>
			{children}
		</ProductsContext.Provider>
	);
};
