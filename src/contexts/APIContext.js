import React, { createContext, useContext } from 'react';

import { db, storage } from '../firebase';

const APIContext = createContext();

export function useApi() {
	return useContext(APIContext);
}

export function APIProvider({ children }) {
	const productsRef = db.collection('products');
	const usersRef = db.collection('users');
	const reviewsRef = db.collection('reviews');
	const ordersRef = db.collection('orders');
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

	async function addReview(
		productId,
		userId,
		userName,
		date,
		body,
		rating
	) {
		await reviewsRef
			.doc(productId.toString())
			.collection('reviews')
			.add({
				userId: userId,
				userName: userName,
				date: date,
				body: body,
				rating: rating,
			})
			.then(() => {
				const reviews = [];
				let avgRating = 0;
				reviewsRef
					.doc(productId.toString())
					.collection('reviews')
					.get()
					.then((snapshot) => {
						snapshot.docs.forEach((doc) => {
							reviews.push(doc.data());
						});
						reviews.forEach((el) => {
							avgRating += el.rating;
						});
						avgRating = avgRating / snapshot.docs.length;
						return avgRating;
					})
					.then((rating) => {
						// TODO:
						reviewsRef.doc(productId.toString()).set({
							avgRating: rating,
						});
					});
			})
			.catch((err) => {
				console.error(err);
				throw new Error('Something went wrong! Try again');
			});
	}

	async function getReviews(productId) {
		let reviews = [];
		await reviewsRef
			.doc(productId.toString())
			.collection('reviews')
			.orderBy('date', 'desc')
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					reviews.push(doc.data());
				});
			});

		return reviews;
	}

	async function getReviewsCount(productId) {
		let size;
		let avgRating;
		await reviewsRef
			.doc(productId.toString())
			.collection('reviews')
			.get()
			.then((snapshot) => {
				size = snapshot.size;
			})
			.then(async () => {
				await reviewsRef
					.doc(productId.toString())
					.get()
					.then((snapshot) => {
						avgRating = snapshot.data()
							? snapshot.data().avgRating
							: 0;
					});
			});
		return {
			size: size ?? 0,
			avgRating: avgRating ?? 0,
		};
	}

	async function addOrder(
		userInfo,
		orderInfo,
		totalPrice,
		orderId,
		userId
	) {
		await ordersRef
			.add({
				orderId: orderId,
				userId: userId ?? '',
				totalPrice: totalPrice,
				step: 1,
				userInfo: userInfo,
				orderInfo: orderInfo,
			})
			.catch((err) => {
				return err;
			});
	}

	async function getOrder(orderId) {
		let order;
		await ordersRef
			.where('orderId', '==', orderId)
			.get()
			.then((snapshot) => {
				order = snapshot.docs[0].data();
			})
			.catch((err) => {
				return err;
			});

		return order;
	}

	const value = {
		setItems,
		getProducts,
		getOneProduct,
		getUserInfo,
		updateUserInfo,
		addReview,
		getReviews,
		getReviewsCount,
		addOrder,
		getOrder,
	};

	return (
		<APIContext.Provider value={value}>
			{children}
		</APIContext.Provider>
	);
}
