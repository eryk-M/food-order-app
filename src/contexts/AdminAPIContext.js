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

	const capitalizeEachWord = (string) =>
		string
			.split(' ')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');

	async function updateAdminProduct(id, data, ingredients, imageSrc) {
		await adminProductsRef.doc(id).update({
			...(imageSrc && { img: imageSrc }),
			availability: data.available,
			category: data.category,
			discountPrice: Number(data.discount),
			sale: Number(data.discount) > 0 ? true : false,
			name: capitalizeEachWord(data.name),
			price: data.price,
			ingredients: ingredients,
			desc: data.description,
		});
	}

	const addAdminProduct = async (data, imageSrc, ingredients) => {
		const abc = await adminProductsRef
			.orderBy('id', 'desc')
			.limit(1)
			.get();
		adminProductsRef.doc(`${abc.docs[0].data().id + 1}`).set({
			id: abc.docs[0].data().id + 1,
			img: imageSrc,
			name: capitalizeEachWord(data.name),
			desc: data.description,
			price: Number(data.price),
			ingredients: ingredients,
			category: data.category,
			quantity: 1,
			avgRating: 0,
			popularity: 0,
			ratingCount: 0,
			availability: data.available,
			discountPrice: data.discount ? Number(data.discount) : 0,
			sale: data.discount ? true : false,
		});
	};

	const value = {
		updateAdminProduct,
		addAdminProduct,
	};

	return (
		<AdminAPIContext.Provider value={value}>
			{children}
		</AdminAPIContext.Provider>
	);
}
