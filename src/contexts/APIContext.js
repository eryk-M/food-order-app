import React, { createContext, useContext } from 'react';

import { db, storage, increment, firestore } from '../firebase';

const APIContext = createContext();

export const useApi = () => useContext(APIContext);

export const APIProvider = ({ children }) => {
	const productsRef = db.collection('products');
	const adminProductsRef = db.collection('adminProducts');
	// const adminOrdersRef = db.collection('adminOrders');
	const usersRef = db.collection('users');
	const reviewsRef = db.collection('reviews');
	const couponsRef = db.collection('coupons');
	const ordersRef = db.collection('orders');
	const quizRef = db.collection('quizes');
	// HELPER AT START TO SET COLLECTION OF PRODUCTS

	const setItems = (data) => {
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
			});
		});
	};

	const setAdminItems = async (data) => {
		for (const {
			id,
			alt,
			name,
			desc,
			price,
			button,
			ingredients,
			category,
			quantity,
			avgRating,
			popularity,
			ratingCount,
			availability,
			discountPrice,
			sale,
			img,
		} of data) {
			const storageRef = storage.ref(`adminDefaultImages/${img}.jpg`);
			const url = await storageRef.getDownloadURL();
			await adminProductsRef.doc(`${id}`).set({
				id,
				img: url,
				alt,
				name,
				desc,
				price,
				button,
				ingredients,
				category,
				quantity,
				avgRating,
				popularity,
				ratingCount,
				availability,
				discountPrice,
				sale,
				img_ref: img,
			});
		}
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
				name,
				address,
				phone,
				city,
				zip,
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
					userId,
					userName,
					date,
					body,
					rating,
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
				avgRating,
				ratingCount: size,
			});
			productsRef.doc(String(productId)).update({
				avgRating,
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
		orderInfo.forEach(async (el) => {
			await productsRef
				.doc(String(el.id))
				.update({ popularity: increment });
		});
		await ordersRef.add({
			orderId,
			userId: userId ?? '',
			totalPrice,
			step: 0,
			userInfo,
			orderInfo,
			date,
			payment,
		});
	};

	const validateDiscountCode = async (code) => {
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

	const deleteQuiz = async (title) => {
		const response = await quizRef.where('title', '==', title).get();

		response.forEach(async (doc) => {
			await doc.ref.delete();
		});
	};

	const addQuiz = async (
		questions,
		{ title, code, discount, fromPrice }
	) => {
		await quizRef.add({
			title: title.toUpperCase(),
			questions,
			coupon: {
				code,
				discount,
				fromPrice,
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
		setAdminItems,
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
		deleteQuiz,
	};

	return (
		<APIContext.Provider value={value}>
			{children}
		</APIContext.Provider>
	);
};
