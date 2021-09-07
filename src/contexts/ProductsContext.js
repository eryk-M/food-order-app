import React, { useState, createContext } from 'react';

//TEST
import { dummyData } from '../components/Products/dummyData';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
	dummyData.forEach((el) => (el.quantity = 1));

	//...setProducts brakuje jbc
	const [products] = useState(dummyData);

	return (
		<ProductsContext.Provider value={products}>
			{children}
		</ProductsContext.Provider>
	);
};
