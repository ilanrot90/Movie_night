// firebase-methods imports
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseDevConfig, firebaseProdConfig } from 'config';
import { isProduction } from 'utils/common.utils';
// config
const config = isProduction ? firebaseProdConfig : firebaseDevConfig;
// providers
export const googleProvider = new app.auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/userinfo.email');
export const facebookProvider = new app.auth.FacebookAuthProvider().addScope('email');
export const githubProvider = new app.auth.GithubAuthProvider().addScope('user:email');

export const firebase = app.initializeApp(config);
export const auth = firebase.auth();
// export const emailAuthProvider = app.auth.EmailAuthProvider;
export const firestore = firebase.firestore();
