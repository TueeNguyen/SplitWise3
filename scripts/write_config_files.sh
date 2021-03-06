#!/bin/bash
# Parameters

## $1=API_KEY $2=AUTH_DOMAIN $3=PROJECT_ID $4=STORAGE_BUCKET 
## $5=MESSAGING_SENDER_ID $6=APP_ID $7=MEASUREMENT_ID

## $8=TYPE $9=PROJECT_ID $10=PRIVATE_KEY_ID $11=PRIVATE_KEY
## $12=CLIENT_EMAIL $13=CLIENT_ID $14=AUTH_URI $15=TOKEN_URI
## $16=AUTH_PROVIDER_X509_CERT_URL $17=CLIENT_X509_CERT_URL

# Object type

## web (JS object) {       api (JSON) {
##  apiKey,                 type,
##  authDomain,             project_id,
##  projectId,              private_key_id,
##  storageBucket,          private_key,
##  messagingSender,        client_email,
##  appId,                  client_id,
##  measurementId,          auth_uri,
## };                       token_uri,
##                          auth_provider_x509_cert_url,
##                          client_x590_cert_url,
##                         }

export FIREBASE_WEB_CONFIG_FILE=./src/web/src/firebase/fbconfig.js
export FIREBASE_ADMIN_CONFIG_FILE=./src/api/src/firebase/serviceAccount.json

# Write firebase web config file
if [ -f $FIREBASE_WEB_CONFIG_FILE ]; then
   rm $FIREBASE_WEB_CONFIG_FILE
   echo "$FIREBASE_WEB_CONFIG_FILE is removed"
fi

touch $FIREBASE_WEB_CONFIG_FILE
echo "Created $FIREBASE_WEB_CONFIG_FILE"

echo "const firebaseConfig = {" >> $FIREBASE_WEB_CONFIG_FILE
echo " apiKey: '${1}'," >> $FIREBASE_WEB_CONFIG_FILE
echo " authDomain: '${2}'," >> $FIREBASE_WEB_CONFIG_FILE 
echo " projectId: '${3}'," >> $FIREBASE_WEB_CONFIG_FILE
echo " storageBucket: '${4}'," >> $FIREBASE_WEB_CONFIG_FILE
echo " messagingSender: '${5}'," >> $FIREBASE_WEB_CONFIG_FILE
echo " appId: '${6}'," >> $FIREBASE_WEB_CONFIG_FILE
echo " measurementId: '${7}'," >> $FIREBASE_WEB_CONFIG_FILE
echo "};" >> $FIREBASE_WEB_CONFIG_FILE
echo "" >> $FIREBASE_WEB_CONFIG_FILE
echo "module.exports = { firebaseConfig };" >> $FIREBASE_WEB_CONFIG_FILE

echo "Finished writing to $FIREBASE_WEB_CONFIG_FILE"

# Write firebase admin api config file 
if [ -f $FIREBASE_ADMIN_CONFIG_FILE ]; then
   rm $FIREBASE_ADMIN_CONFIG_FILE
   echo "$FIREBASE_ADMIN_CONFIG_FILE is removed"
fi

touch $FIREBASE_ADMIN_CONFIG_FILE
echo "Created $FIREBASE_ADMIN_CONFIG_FILE"

echo "{" >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"type\": \"${8}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"project_id\": \"${9}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"private_key_id\": \"${10}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"private_key\": \"${11}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"client_email\": \"${12}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"client_id\": \"${13}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"auth_uri\": \"${14}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"token_uri\": \"${15}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"auth_provider_x509_cert_url\": \"${16}\"," >> $FIREBASE_ADMIN_CONFIG_FILE
echo "  \"client_x509_cert_url\": \"${17}\"" >> $FIREBASE_ADMIN_CONFIG_FILE
echo "}" >> $FIREBASE_ADMIN_CONFIG_FILE
