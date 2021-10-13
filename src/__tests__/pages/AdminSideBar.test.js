jest.mock('firebase', () => ({
	initializeApp: jest.fn(),
	logout: jest.fn(),

	auth: { onAuthStateChanged: jest.fn() },
}));
