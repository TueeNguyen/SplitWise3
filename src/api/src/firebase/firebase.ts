import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseCredentials } from './configs';
import { getStorage } from 'firebase/storage';

let appCredentials = {};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  appCredentials = firebaseCredentials;
}

if (process.env.NODE_ENV === 'production') {
  appCredentials = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID
  };
}

const app = initializeApp(appCredentials);

const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
