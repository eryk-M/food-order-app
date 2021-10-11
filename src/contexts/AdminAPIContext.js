import React, { createContext, useContext } from 'react';

import { db, storage } from '../firebase';

import { capitalizeEachWord } from 'utils/capitalizeEachWord';

const AdminAPIContext = createContext();

export const useAdminApi = () => useContext(AdminAPIContext);

export const AdminAPIProvider = ({ children }) => {
	const adminProductsRef = db.collection('adminProducts');
	const adminOrdersRef = db.collection('adminOrders');

	const updateAdminProduct = async (
		id,
		data,
		ingredients,
		imageSrc
	) => {
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
	};

	const addAdminProduct = async (data, imageSrc, ingredients) => {
		const response = await adminProductsRef
			.orderBy('id', 'desc')
			.limit(1)
			.get();
		adminProductsRef.doc(`${response.docs[0].data().id + 1}`).set({
			id: response.docs[0].data().id + 1,
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

	const deleteAdminProduct = async (id) => {
		const response = await adminProductsRef
			.where('id', '==', id)
			.get();
		const data = response.docs[0].data();
		response.forEach(async (doc) => {
			await doc.ref.delete();
		});
		if (id < 12) {
			return;
		} else {
			const pictureRef = storage.refFromURL(data.img);
			await pictureRef.delete();
		}
	};

	const deleteAdminOrders = async (orders) => {
		orders.forEach(async (order) => {
			await adminOrdersRef.doc(order.value).delete();
		});
	};

	const updateAdminOrderStatus = async (step, id) => {
		await adminOrdersRef.doc(id).update({ step: step });
	};
	const value = {
		updateAdminProduct,
		addAdminProduct,
		deleteAdminProduct,
		deleteAdminOrders,
		updateAdminOrderStatus,
	};

	return (
		<AdminAPIContext.Provider value={value}>
			{children}
		</AdminAPIContext.Provider>
	);
};
