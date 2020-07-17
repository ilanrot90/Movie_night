// firebase imports
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseDevConfig, firebaseProdConfig } from "config";
import { isProduction } from "utils/common";
// config
const config = isProduction ? firebaseProdConfig : firebaseDevConfig;
// providers
export const googleProvider = new app.auth.GoogleAuthProvider();

export const firebase = app.initializeApp(config);
export const auth = firebase.auth();

export const firestore = firebase.firestore();
