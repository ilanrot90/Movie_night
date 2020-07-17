// firebase imports
import app from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import { firebaseDevConfig, firebaseProdConfig } from 'config';
import {isProduction} from "utils/common";

const config = isProduction? firebaseProdConfig : firebaseDevConfig;

export default class Firebase {
    constructor() {
        app.initializeApp(config)
    }
}
