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

	const value = {};

	return (
		<AdminAPIContext.Provider value={value}>
			{children}
		</AdminAPIContext.Provider>
	);
}
