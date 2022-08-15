import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { adminCredentials } from './configs';
import { credential, ServiceAccount } from 'firebase-admin';
const app = initializeApp({
  credential: credential.cert(adminCredentials as ServiceAccount)
});
const dbAdmin = getFirestore(app);
const authAdmin = getAuth(app);
const storageAdmin = getStorage(app);

export { dbAdmin, authAdmin, storageAdmin };
