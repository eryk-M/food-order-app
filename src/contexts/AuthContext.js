import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [admin, setAdmin] = useState();
	// const userRef = db.collection('users');

	const signup = async (email, password, username, history) => {
		try {
			const createdUser = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await db.collection('users').doc(createdUser.user.uid).set({
				email: email,
				username: username,
				isAdmin: false,
				name: '',
				address: '',
				phone: '',
				city: '',
				zip: '',
				orders: [],
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
			const response = await auth.signInWithEmailAndPassword(
				email,
				password
			);
			const doc = await db
				.collection('users')
				.doc(response.user.uid)
				.get();
			const user = doc.data();
			if (user.isAdmin) {
				history.push('/admin');
				setAdmin(true);
			} else {
				history.push({ pathname: '/user', query: query });
			}
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

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}
	useEffect(() => {
		const usubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return usubscribe;
	}, []);

	const value = {
		currentUser,
		admin,
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
}
