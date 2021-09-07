import React, { createContext, useContext } from 'react';

import { db, storage } from '../firebase';

const APIContext = createContext();

export function useApi() {
	return useContext(APIContext);
}

export function APIProvider({ children }) {
	// HELPER AT START TO SET COLLECTION OF PRODUCTS
	function setItems(data) {
		const productsRef = db.collection('products');

		data.forEach((el) => {
			const storageRef = storage.ref(`images/${el.img}.jpg`);
			storageRef.getDownloadURL().then((url) => {
				productsRef
					.doc(`${el.id}`)
					.set({
						id: el.id,
						img: url,
						alt: el.alt,
						name: el.name,
						desc: el.desc,
						price: el.price,
						button: el.button,
						ingredients: el.ingredients,
						category: el.category,
						quantity: el.quantity,
					})
					.then(() => {
						console.log(el.id, ' successfully written!');
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	}

	async function getProducts() {
		const productsRef = db.collection('products');
		let data = [];
		await productsRef.get().then((snapshot) => {
			snapshot.forEach((doc) => {
				const item = doc.data();
				data.push(item);
			});
		});
		return data;
	}

	async function getOneProduct(id) {
		const productsRef = db.collection('products');

		let product;
		await productsRef
			.where('id', '==', id)
			.get()
			.then((snapshot) => {
				product = snapshot.docs[0].data();
			});
		return product;
	}

	const value = {
		setItems,
		getProducts,
		getOneProduct,
	};

	return (
		<APIContext.Provider value={value}>
			{children}
		</APIContext.Provider>
	);
}
