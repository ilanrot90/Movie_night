import EventEmitter from 'eventemitter3';

const authEmitter = new EventEmitter();

const mockFirebase: any = {
	initializeApp: jest.fn().mockReturnValue({
		auth: jest.fn().mockReturnValue({
			currentUser: {
				displayName: 'redirectResultTestDisplayName',
				email: 'redirectTest@test.com',
				emailVerified: true,
				uid: 'id123',
				providerData: [
					{
						email: 'redirectTest@test.com',
						displayName: 'redirectResultTestDisplayName',
						providerId: 'google',
					},
				],
			},
			signInWithRedirect: jest.fn(),
			getRedirectResult: jest.fn().mockReturnValue({
				credential: {
					providerId: 'Google',
				},
				user: {
					getIdToken: jest.fn().mockResolvedValue('abc1234'),
				},
				additionalUserInfo: {
					profile: {
						email: '__tests__@__tests__.com',
						name: 'John Doe',
					},
				},
			}),
			onAuthStateChanged: jest.fn(fn => {
				fn({
					displayName: 'redirectResultTestDisplayName',
					email: 'redirectTest@test.com',
					emailVerified: true,
					uid: 'id123',
					providerData: [
						{
							email: 'redirectTest@test.com',
							displayName: 'redirectResultTestDisplayName',
							providerId: 'google',
						},
					],
				});

				authEmitter.on('changeState', fn, undefined);
			}),
			signOut: jest.fn(() => {
				authEmitter.emit('changeState', undefined);
			}),
			sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
		}),
		firestore: jest.fn().mockReturnValue({
			collection: jest.fn().mockReturnValue({
				add: jest.fn().mockResolvedValue({
					id: 'abc123',
				}),
			}),
		}),
	}),
	auth: {
		GoogleAuthProvider: class {
			addScope = jest.fn();
		},
		GithubAuthProvider: class {
			addScope = jest.fn();
		},
		FacebookAuthProvider: class {
			addScope = jest.fn();
		},
	},
};

jest.mock('firebase/app', () => mockFirebase);
