import { facebookProvider, githubProvider, googleProvider, auth, firestore } from './Firebase';
import { Provider, FormValues } from 'types';
import { asyncHandler } from 'utils/common.utils';
import { get } from 'utils/lodash.utils';

export const handleEmailSignUp = async ({ email, password, displayName }: FormValues) => {
	const { error } = await asyncHandler(auth.createUserWithEmailAndPassword(email, password));
	if (error) {
		// TODO: handle error
		console.log('handleEmailSignIn', { error });
		return Promise.reject<any>(error);
	}
	const user = auth.currentUser;

	return Promise.all([
		// send verify email
		user?.sendEmailVerification(),
		// add to DB
		firestore.collection('users').doc(user?.uid).set({
			email,
			displayName,
		}),
	]);
};

// Send recover password
export const recoverPassword = (email: string) => {
	return auth.sendPasswordResetEmail(email);
};
// resend email validation
export const resendVerifyEmail = () => {
	const user = auth.currentUser;

	if (user) {
		return user.sendEmailVerification();
	}

	throw new Error('user was not found');
};

export const getProvider = (provider: Provider) =>
	({
		google: googleProvider,
		facebook: facebookProvider,
		github: githubProvider,
	}[provider]);

export const loginWithProvider = async (provider: Provider) => {
	const providerConfig = getProvider(provider);
	const { response, error } = await asyncHandler(auth.signInWithPopup(providerConfig));
	if (error) {
		console.log('loginWithProvider', { error });
		throw error;
	}

	if (response?.user) {
		const { uid } = response.user;
		const { email, displayName } = get(response, 'user.providerData[0]');

		if (response?.additionalUserInfo?.isNewUser) {
			return Promise.all([
				auth.currentUser?.updateProfile({
					displayName,
				}),
				firestore.collection('users').doc(uid).set({
					email,
					displayName,
				}),
			]);
		}

		return;
	}

	throw new Error('Internal error');
};

export const handleEmailLogin = ({ email, password }: FormValues) => {
	return auth.signInWithEmailAndPassword(email, password);
};
