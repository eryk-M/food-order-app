import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signup = async (email, password, username, history) => {
		try {
			const createdUser = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await db.collection('users').doc(createdUser.user.uid).set({
				email: email,
				username: username.toLowerCase(),
				isAdmin: false,
				name: '',
				address: '',
				phone: '',
				city: '',
				zip: '',
				orders: [],
				quizes: [],
				usedCoupons: [],
				coupons: [],
			});
			const user = auth.currentUser;
			await user.updateProfile({ displayName: username });
			history.push({
				pathname: '/user',
				query: history.location.query,
			});
		} catch (err) {
			throw new Error(err.code);
		}
	};

	const login = async (email, password, history, query) => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			history.push({ pathname: '/user', query: query });
		} catch (err) {
			console.error(err);
		}
	};

	const logout = () => auth.signOut();

	const resetPassword = (email) => auth.sendPasswordResetEmail(email);

	const updateEmail = async (email) => {
		await currentUser.updateEmail(email);
		db.collection('users').doc(currentUser.uid).update({
			email: email,
		});
	};

	const updatePassword = (password) => {
		return currentUser.updatePassword(password);
	};
	useEffect(() => {
		const usubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return usubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
