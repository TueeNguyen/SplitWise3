import { db, auth } from '../db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const createUser = async (username: string, email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {}
  return false;
};

const updateUser = () => {};

const getUserById = () => {};

const getUsersByExpenseId = () => {};
