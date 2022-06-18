import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import firebaseConfig from './serviceAccount.json';
import { credential, ServiceAccount } from 'firebase-admin';

const app = initializeApp({ credential: credential.cert(firebaseConfig as ServiceAccount) });
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
