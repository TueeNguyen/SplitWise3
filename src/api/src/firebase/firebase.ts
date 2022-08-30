import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseCredentials } from './configs';

let appCredentials = {};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  appCredentials = firebaseCredentials;
}

if (process.env.NODE_ENV === 'production') {
  appCredentials = {
    type: process.env.ADMIN_TYPE,
    project_id: process.env.ADMIN_PROJECT_ID,
    private_key_id: process.env.ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.ADMIN_CLIENT_EMAIL,
    client_id: process.env.ADMIN_CLIENT_ID,
    auth_uri: process.env.ADMIN_AUTH_URI,
    token_uri: process.env.ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.ADMIN_CLIENT_X509_CERT_URL
  };
}

const app = initializeApp(appCredentials);

const auth = getAuth(app);

export { auth };
