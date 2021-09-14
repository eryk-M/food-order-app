import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';
import { auth, db } from '../firebase';
// import { collection, query, where } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const userRef = db.collection('users');

	async function signup(email, password, username, history) {
		await userRef
			.where('username', '==', username)
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					console.log(snapshot);
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

							user
								.updateProfile({ displayName: username })
								.then(() => {
									history.push({
										pathname: '/user',
										query: history.location.query,
									});
								});
						});
				} else {
					let error = new Error();
					error = {
						...error,
						code: 'username/taken',
					};
					throw error;
				}
			})

			.catch((err) => {
				switch (err.code) {
					case 'auth/email-already-in-use':
						throw new Error(err.code);
					case 'username/taken':
						throw new Error(err.code);
					default:
						break;
				}
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
