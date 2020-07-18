// firebase-methods imports
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseDevConfig, firebaseProdConfig } from 'config';
import { isProduction } from 'utils/common';
// config
const config = isProduction ? firebaseProdConfig : firebaseDevConfig;
// providers
const googleProvider = new app.auth.GoogleAuthProvider();
const facebookProvider = new app.auth.FacebookAuthProvider();
const githubProvider = new app.auth.GithubAuthProvider();

export type Provider = 'google' | 'facebook' | 'github';
export const getProvider = (provider: Provider) =>
	({
		google: googleProvider,
		facebook: facebookProvider,
		github: githubProvider,
	}[provider]);

export const firebase = app.initializeApp(config);
export const auth = firebase.auth();
// export const emailAuthProvider = app.auth.EmailAuthProvider;
export const firestore = firebase.firestore();
