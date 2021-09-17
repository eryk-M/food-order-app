import { db } from 'firebase';

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
