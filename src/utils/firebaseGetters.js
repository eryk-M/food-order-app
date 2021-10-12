import { db } from 'firebase';
// GETTERS TO CUSTOM HOOK USE FIRESTORE QUERY

// MAIN PAGE //

export const getUserDoc = (uid) => db.collection('users').doc(uid);

export const getReviews = (productId) =>
	db
		.collection('reviews')
		.doc(productId.toString())
		.collection('reviews')
		.orderBy('date', 'desc');

export const getAllProducts = () => db.collection('products');

export const getOrder = (orderId) =>
	orderId
		? db.collection('orders').where('orderId', '==', orderId)
		: null;

export const getUserOrders = (uid) =>
	db.collection('orders').where('userId', '==', uid);

export const getOneProduct = (id) =>
	db.collection('products').where('id', '==', id);

export const validateUsername = (username) =>
	db.collection('users').where('username', '==', username);

export const validateCouponCode = (code) =>
	db.collection('coupons').where('code', '==', code);

export const validateQuizTitle = (title) =>
	db.collection('quizes').where('title', '==', title);

export const getCoupons = () => db.collection('coupons');

export const getTopProducts = () =>
	db.collection('products').orderBy('popularity', 'desc').limit(3);

export const getQuizes = () => db.collection('quizes');

// ADMIN PANEL //
export const getAdminAllProducts = () =>
	db.collection('adminProducts').orderBy('id');

export const getAdminOneProduct = (id) =>
	db.collection('adminProducts').where('id', '==', id);

//CHANGED FROM COLLECTION ADMIN TO ALL ORDERS
export const getAdminAllOrders = () => db.collection('orders');

export const getAdminOneOrder = (id) =>
	db.collection('adminOrders').where('orderId', '==', id);
