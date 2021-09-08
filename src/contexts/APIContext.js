import React, { createContext, useContext } from 'react';

import { db, storage } from '../firebase';

const APIContext = createContext();

export function useApi() {
	return useContext(APIContext);
}

export function APIProvider({ children }) {
	const productsRef = db.collection('products');
	const usersRef = db.collection('users');

	// HELPER AT START TO SET COLLECTION OF PRODUCTS

	function setItems(data) {
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
		let product;
		await productsRef
			.where('id', '==', id)
			.get()
			.then((snapshot) => {
				product = snapshot.docs[0].data();
			});
		return product;
	}

	async function getUserInfo(uid) {
		let user;
		await usersRef
			.doc(uid)
			.get()
			.then((doc) => {
				user = doc.data();
			});
		return user;
	}

	async function updateUserInfo(
		uid,
		name,
		address,
		phone,
		city,
		zip
	) {
		await usersRef
			.doc(uid)
			.update({
				name: name,
				address: address,
				phone: phone,
				city: city,
				zip: zip,
			})
			.catch((err) => {
				console.error(err);
				throw new Error('Error updating user!');
			});
	}

	const value = {
		setItems,
		getProducts,
		getOneProduct,
		getUserInfo,
		updateUserInfo,
	};

	return (
		<APIContext.Provider value={value}>
			{children}
		</APIContext.Provider>
	);
}
