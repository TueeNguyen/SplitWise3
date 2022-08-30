file_content="
  const adminCredentials = {
    // TODO: add firebase admin credentials here, you also need to convert JSON file to Javascript Object
  };
  const firebaseCredentials = {
    // TODO: add firebase SDK credentials here
  };
  export { adminCredentials, firebaseCredentials };

"

file_path="./src/api/src/firebase/configs.ts"
if [ -f $file_path ]; 
then
  echo "$file_path exists, delete manually or edit this file instead"
else
  touch $file_path
  echo "$file_content" >> $file_path
fi


