import { isTest } from './utils/common.utils';

export const firebaseDevConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	appId: process.env.REACT_APP_APP_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export const firebaseProdConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	appId: process.env.REACT_APP_APP_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export const firebaseTestConfig = {
	apiKey: 'TEST',
	authDomain: 'TEST',
	databaseURL: 'TEST',
	projectId: 'TEST',
	appId: 'TEST',
	storageBucket: 'TEST',
	messagingSenderId: 'TEST',
};

export const TMBD_KEY = isTest ? 'test_key' : process.env.REACT_APP_TMBD_KEY;
