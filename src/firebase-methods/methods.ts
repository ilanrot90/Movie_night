import { facebookProvider, githubProvider, googleProvider, auth, firestore } from './Firebase';
import { Provider, FormValues } from 'types';
import { asyncHandler } from 'utils/common.utils';
import { get } from 'utils/lodash.utils';

export const handleEmailSignUp = async ({ email, password, displayName }: FormValues) => {
	const { error } = await asyncHandler(auth.createUserWithEmailAndPassword(email, password));
	if (error) {
		// TODO: handle error
		console.log('handleEmailSignIn', { error });
		return error;
	}
	const user = auth.currentUser;

	// send verify email
	await user?.sendEmailVerification();
	// add to DB
	await firestore.collection('users').doc(user?.uid).set({
		email,
		displayName,
	});

	return;
};

// Send recover password
export const recoverPassword = async (email: string) => {
	return await auth.sendPasswordResetEmail(email);
};
// resend email validation
export const resendVerifyEmail = async () => {
	const user = auth.currentUser;

	if (user) {
		return await user.sendEmailVerification();
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
			const { error } = await asyncHandler(
				Promise.all([
					auth.currentUser?.updateProfile({
						displayName,
					}),
					firestore.collection('users').doc(uid).set({
						email,
						displayName,
					}),
				])
			);

			if (error) {
				console.log('save user', { error });
				throw error;
			}
		}

		return;
	}

	throw new Error('Internal error');
};

export const handleEmailLogin = async ({ email, password }: FormValues) => {
	const { error } = await asyncHandler(auth.signInWithEmailAndPassword(email, password));
	if (error) {
		console.log('handleEmailLogin', { error });
		throw error;
	}

	return;
};
