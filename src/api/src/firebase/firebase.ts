import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseCredentials } from './configs';

const app = initializeApp(firebaseCredentials);

const auth = getAuth(app);

export { auth };
