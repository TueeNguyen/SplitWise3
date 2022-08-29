file_content="
  const adminCredentials = {
    // TODO: add firebase admin credentials here, you also need to convert JSON file to Javascript Object
  };
  const firebaseCredentials = {
    // TODO: add firebase SDK credentials here
  };
  export { adminCredentials, firebaseCredentials };

"

echo "$file_content"

file_path="./src/api/src/fireabase/configs.ts"
if [ -f $file_path ]; then
   rm $file_path
   echo "$file_path is removed"
fi

touch $file_path
echo "$file_content" >> $file_path
