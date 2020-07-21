import { facebookProvider, githubProvider, googleProvider, auth, firestore } from './Firebase';
import { Provider, FormValues } from '../types';
import { asyncHandler } from 'utils/common.utils';
import { get } from 'utils/lodash.utils';

export const handleEmailSignUp = async ({ email, password, displayName }: FormValues) => {
	const { error } = await asyncHandler(auth.createUserWithEmailAndPassword(email, password));
	if (error) {
		// TODO: handle error
		console.log('handleEmailSignIn', { error });
	}
	const user = auth.currentUser;

	// send verify email
	await user?.sendEmailVerification();
	// add to DB
	await firestore.collection('users').doc(user?.uid).set({
		email,
		displayName,
	});
};

// Send recover password
export const recoverPassword = async () => {
	const user = auth.currentUser;

	if (user) {
		const { error } = await asyncHandler(user.sendEmailVerification());
		if (error) {
			// TODO: handle error
			console.log('recoverPassword', { error });
		}
	}
};
// resend email validation
export const reSendEmail = async (email: string) => {
	const { error } = await asyncHandler(auth.sendPasswordResetEmail(email));
	if (error) {
		// TODO: handle error
		console.log('recoverPassword', { error });
	}
};
export const getProvider = (provider: Provider) =>
	({
		google: googleProvider,
		facebook: facebookProvider,
		github: githubProvider,
	}[provider]);

export const loginWithProvider = async (provider: Provider) => {
	let isNewUser = false;
	const providerConfig = getProvider(provider);
	const { response, error } = await asyncHandler(auth.signInWithPopup(providerConfig));
	if (error) {
		console.log(error);
		throw error;
	}

	if (response?.user) {
		const { uid } = response.user;
		const { email, displayName } = get(response, 'user.providerData[0]');

		if (response?.additionalUserInfo?.isNewUser) {
			await Promise.all([
				auth.currentUser?.updateProfile({
					displayName,
				}),
				firestore.collection('users').doc(uid).set({
					email,
					displayName,
				}),
			]);

			isNewUser = true;
		}

		return { isNewUser, user: get(response, 'user') };
	}

	throw new Error('Internal error');
};

export const handleEmailLogin = async ({ email, password }: FormValues) => {
	const { response, error } = await asyncHandler(auth.signInWithEmailAndPassword(email, password));
	if (error) {
		console.log({ error });
	}

	return response?.user;
};
