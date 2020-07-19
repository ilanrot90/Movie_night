// firebase-methods imports
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseDevConfig, firebaseProdConfig } from 'config';
import { isProduction } from 'utils/common.utils';
// config
const config = isProduction ? firebaseProdConfig : firebaseDevConfig;
// providers
const googleProvider = new app.auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/userinfo.email');
const facebookProvider = new app.auth.FacebookAuthProvider().addScope('email');
const githubProvider = new app.auth.GithubAuthProvider().addScope('user:email');

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
