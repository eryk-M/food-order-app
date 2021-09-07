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

	async function signup(email, password, username, history) {
		const userRef = db.collection('users');

		await userRef
			.where('username', '==', username)
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					return auth
						.createUserWithEmailAndPassword(email, password)
						.then((createdUser) => {
							db.collection('users')
								.doc(createdUser.user.uid)
								.set({ username: username });
						})
						.then(() => {
							history.push('/user');
						});
				} else {
					let error = new Error();
					error = {
						...error,
						code: 'username/taken',
						message: 'Username already taken',
					};
					throw error;
				}
			})

			.catch((err) => {
				switch (err.code) {
					case 'auth/email-already-in-use':
						throw new Error('E-mail already in use');
					case 'username/taken':
						throw new Error(err.message);
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
