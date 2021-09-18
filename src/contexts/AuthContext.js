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

	async function signup(email, password, username, history) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((createdUser) => {
				db.collection('users').doc(createdUser.user.uid).set({
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

	function login(email, password, history, query) {
		return auth
			.signInWithEmailAndPassword(email, password)
			.then((snapshot) => {
				db.collection('users')
					.doc(snapshot.user.uid)
					.get()
					.then((doc) => {
						const user = doc.data();
						if (user.isAdmin) {
							history.push('/admin');
							setAdmin(true);
						} else {
							history.push({ pathname: '/user', query: query });
						}
					});
			});
	}

	function logout(email, password) {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email).then((user) => {
			db.collection('users').doc(user.user.uid).update({
				email: email,
			});
		});
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
