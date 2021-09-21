import React, { createContext, useContext } from 'react';

import { db, storage } from '../firebase';

const AdminAPIContext = createContext();

export function useAdminApi() {
	return useContext(AdminAPIContext);
}

export function AdminAPIProvider({ children }) {
	const adminProductsRef = db.collection('adminProducts');
	const adminUsersRef = db.collection('adminUsers');
	const adminReviewsRef = db.collection('adminReviews');

	async function updateAdminProduct(id, data, ingredients, imageSrc) {
		await adminProductsRef.doc(id).update({
			...(imageSrc && { img: imageSrc }),
			availability: data.available,
			category: data.category,
			discountPrice: Number(data.discount),
			sale: Number(data.discount) > 0 ? true : false,
			name: data.name
				.split(' ')
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
				.join(' '),
			price: data.price,
			ingredients: ingredients,
		});
	}

	const value = {
		updateAdminProduct,
	};

	return (
		<AdminAPIContext.Provider value={value}>
			{children}
		</AdminAPIContext.Provider>
	);
}
