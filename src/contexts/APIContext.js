import React, { createContext, useContext } from 'react';

import { db, storage, increment, firestore } from '../firebase';

const APIContext = createContext();

export function useApi() {
	return useContext(APIContext);
}

export function APIProvider({ children }) {
	const productsRef = db.collection('products');
	const adminProductsRef = db.collection('adminProducts');
	// const adminOrdersRef = db.collection('adminOrders');
	const usersRef = db.collection('users');
	const reviewsRef = db.collection('reviews');
	const couponsRef = db.collection('coupons');
	const ordersRef = db.collection('orders');
	const quizRef = db.collection('quizes');
	// HELPER AT START TO SET COLLECTION OF PRODUCTS

	const setItems = (data, admin) => {
		data.forEach((el) => {
			const storageRef = storage.ref(`images/${el.img}.jpg`);
			storageRef.getDownloadURL().then((url) => {
				if (admin) {
					adminProductsRef
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
							avgRating: el.avgRating,
							popularity: el.popularity,
							ratingCount: el.ratingCount,
							availability: el.availability,
							discountPrice: el.discountPrice,
							sale: el.sale,
						})
						.then(() => {
							console.log(el.id, ' admin successfully written!');
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
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
							avgRating: el.avgRating,
							popularity: el.popularity,
							ratingCount: el.ratingCount,
							availability: el.availability,
							discountPrice: el.discountPrice,
							sale: el.sale,
						})
						.then(() => {
							console.log(el.id, ' successfully written!');
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
		});
	};

	const updateUserInfo = async (
		uid,
		name,
		address,
		phone,
		city,
		zip
	) => {
		try {
			await usersRef.doc(uid).update({
				name: name,
				address: address,
				phone: phone,
				city: city,
				zip: zip,
			});
		} catch (err) {
			console.error(err);
			throw new Error('Error updating user!');
		}
	};

	const addReview = async (
		productId,
		userId,
		userName,
		date,
		body,
		rating
	) => {
		try {
			await productsRef
				.doc(String(productId))
				.update({ popularity: increment });
			await reviewsRef
				.doc(String(productId))
				.collection('reviews')
				.add({
					userId: userId,
					userName: userName,
					date: date,
					body: body,
					rating: rating,
				});
			const reviews = [];
			let avgRating = 0;
			let size;
			const response = await reviewsRef
				.doc(String(productId))
				.collection('reviews')
				.get();
			response.docs.forEach((doc) => {
				reviews.push(doc.data());
			});
			reviews.forEach((el) => {
				avgRating += el.rating;
			});
			size = response.size;
			avgRating = avgRating / response.docs.length;
			reviewsRef.doc(String(productId)).set({
				avgRating: avgRating,
				ratingCount: size,
			});
			productsRef.doc(String(productId)).update({
				avgRating: avgRating,
				ratingCount: size,
			});
		} catch (err) {
			throw new Error('Something went wrong! Try again');
		}
	};

	const addOrder = async (
		userInfo,
		orderInfo,
		totalPrice,
		orderId,
		userId,
		date,
		payment
	) => {
		try {
			orderInfo.forEach(async (el) => {
				await productsRef
					.doc(String(el.id))
					.update({ popularity: increment });
			});
			await ordersRef.add({
				orderId: orderId,
				userId: userId ?? '',
				totalPrice: totalPrice,
				step: 0,
				userInfo: userInfo,
				orderInfo: orderInfo,
				date: date,
				payment: payment,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const validateDiscountCode = async (code, totalPrice) => {
		return await couponsRef.where('code', '==', code).get();
	};

	const validateQuizCode = async (uid) => {
		return await usersRef.doc(uid).get();
	};

	const updateOrderStatus = async (step, id) => {
		await ordersRef.doc(id).update({ step: step });
	};

	const addCoupon = async (code, discount, fromPrice, quiz) => {
		await couponsRef.add({
			code: code.toUpperCase(),
			discount: Number(discount),
			fromPrice: Number(fromPrice),
			quiz: quiz ?? 'false',
		});
	};

	const setCouponAsUsed = async (uid, code) => {
		await usersRef.doc(uid).update({
			usedCoupons: firestore.FieldValue.arrayUnion({
				code: code,
			}),
		});
	};

	const deleteCoupon = async (code) => {
		const response = await couponsRef.where('code', '==', code).get();
		response.forEach(async (doc) => {
			await doc.ref.delete();
		});
	};

	const deleteOrders = async (orders) => {
		orders.forEach(async (order) => {
			await ordersRef.doc(order.id).delete();
		});
	};

	const addQuiz = async (questions, data) => {
		await quizRef.add({
			title: data.title,
			questions: questions,
			coupon: {
				code: data.code,
				discount: data.discount,
				fromPrice: data.fromPrice,
			},
		});
	};

	const addQuizAndCouponToUser = async (uid, quizId, coupon, won) => {
		if (won) {
			await usersRef.doc(uid).update({
				quizes: firestore.FieldValue.arrayUnion({
					id: quizId,
				}),
				coupons: firestore.FieldValue.arrayUnion({
					code: coupon.code,
					used: false,
					discount: coupon.discount,
					fromPrice: Number(coupon.fromPrice),
				}),
			});
		} else {
			await usersRef.doc(uid).update({
				quizes: firestore.FieldValue.arrayUnion({
					id: quizId,
				}),
			});
		}
	};

	const value = {
		setItems,
		updateUserInfo,
		addReview,
		addOrder,
		validateDiscountCode,
		updateOrderStatus,
		addCoupon,
		deleteCoupon,
		deleteOrders,
		addQuiz,
		addQuizAndCouponToUser,
		validateQuizCode,
		setCouponAsUsed,
	};

	return (
		<APIContext.Provider value={value}>
			{children}
		</APIContext.Provider>
	);
}

//// JUST IN CASE

// async function getProducts() {
// 	let data = [];
// 	await productsRef.get().then((snapshot) => {
// 		snapshot.forEach((doc) => {
// 			const item = doc.data();
// 			data.push(item);
// 		});
// 	});
// 	return data;
// }

// async function getOneProduct(id) {
// 	let product;
// 	await productsRef
// 		.where('id', '==', id)
// 		.get()
// 		.then((snapshot) => {
// 			product = snapshot.docs[0].data();
// 		});
// 	return product;
// }

// async function getUserInfo(uid) {
// 	let user;
// 	await usersRef
// 		.doc(uid)
// 		.get()
// 		.then((doc) => {
// 			user = doc.data();
// 		});
// 	return user;
// }

// async function getReviews(productId) {
// 	let reviews = [];
// 	await reviewsRef
// 		.doc(productId)
// 		.collection('reviews')
// 		.orderBy('date', 'desc')
// 		.get()
// 		.then((snapshot) => {
// 			snapshot.docs.forEach((doc) => {
// 				reviews.push(doc.data());
// 			});
// 		});

// 	return reviews;
// }

// async function getOrder(orderId) {
// 	let order;
// 	await ordersRef
// 		.where('orderId', '==', orderId)
// 		.get()
// 		.then((snapshot) => {
// 			order = snapshot.docs[0].data();
// 		})
// 		.catch((err) => {
// 			return err;
// 		});

// 	return order;
// }

// async function getUserOrders(userId) {
// 	let orders = [];

// 	await ordersRef
// 		.where('userId', '==', userId)
// 		.get()
// 		.then((snapshot) => {
// 			snapshot.docs.forEach((doc) => {
// 				orders.push(doc.data());
// 			});
// 		})
// 		.catch((err) => {
// 			return err;
// 		});
// 	return orders;
// }

// async function validateUsername(username) {
// 	let found = false;
// 	await usersRef
// 		.where('username', '==', username)
// 		.get()
// 		.then((snapshot) => {
// 			if (snapshot.empty) {
// 				return found;
// 			} else {
// 				found = true;
// 			}
// 		});
// 	return found;
// }
// JUST IN CASE
