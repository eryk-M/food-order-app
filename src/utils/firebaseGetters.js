import { db } from 'firebase';

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
	db.collection('orders').where('orderId', '==', orderId);

export const getUserOrders = (uid) =>
	db.collection('orders').where('userId', '==', uid);

export const getOneProduct = (id) =>
	db.collection('products').where('id', '==', id);

export const validateUsername = (username) =>
	db.collection('users').where('username', '==', username);

// ADMIN PANEL //
export const getAdminAllProducts = () =>
	db.collection('adminProducts').orderBy('id');

export const getAdminOneProduct = (id) =>
	db.collection('adminProducts').where('id', '==', id);

export const getAdminAllOrders = () => db.collection('adminOrders');

export const getAdminOneOrder = (id) =>
	db.collection('adminOrders').where('orderId', '==', id);
