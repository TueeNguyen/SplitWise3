import bcrypt from 'bcryptjs';

const encryptPassword = async (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(hash);
      });
    });
  });

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, isMatched) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(isMatched);
    });
  });

export { encryptPassword, comparePassword };
