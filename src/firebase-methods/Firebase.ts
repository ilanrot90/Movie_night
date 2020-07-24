// firebase-methods imports
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseDevConfig, firebaseProdConfig, firebaseTestConfig } from 'config';
import { isProduction, isTest } from 'utils/common.utils';
// config
const config = isProduction ? firebaseProdConfig : isTest ? firebaseTestConfig : firebaseDevConfig;
export const firebase = app.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// providers
export const googleProvider = new app.auth.GoogleAuthProvider().addScope('https://www.googleapis.com/auth/userinfo.email');
export const facebookProvider = new app.auth.FacebookAuthProvider().addScope('email');
export const githubProvider = new app.auth.GithubAuthProvider().addScope('user:email');
