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

	// const userRef = db.collection('users');

	async function signup(email, password, username, history) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((createdUser) => {
				db.collection('users').doc(createdUser.user.uid).set({
					username: username,
					name: '',
					address: '',
					phone: '',
					city: '',
					zip: '',
					orders: [],
				});
			})
			.then(() => {
				const user = auth.currentUser;

				user.updateProfile({ displayName: username }).then(() => {
					history.push({
						pathname: '/user',
						query: history.location.query,
					});
				});
			})
			.catch((err) => {
				throw new Error(err.code);
			});
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout(email, password) {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

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
