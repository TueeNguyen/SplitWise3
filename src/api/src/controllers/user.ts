import { db, auth } from '../db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, query, setDoc, updateDoc } from 'firebase/firestore';
import { User, IUser } from '../models/user';
import { getExpenseById } from './expense';
import { Expense } from '../models/expense';

const createUser = async (username: string, email: string, password: string) => {
  try {
    const {
      user: { uid }
    } = await createUserWithEmailAndPassword(auth, email, password);
    const user: IUser = new User(uid, email, username);
    await setDoc(doc(db, 'Users', uid), Object.assign({}, user));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateUser = async (updateObj: User) => {
  try {
    const { uid, username, avatar } = updateObj;
    const userRef = doc(db, 'Users', uid);
    await updateDoc(userRef, { username, avatar });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUserByUid = async (uid: string): Promise<User> => {
  try {
    const userRef = doc(db, 'Users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const { uid, username, email } = userSnap.data();
      const user: User = new User(uid, username, email);
      return user;
    } else {
      console.error(`User with ${uid} not found!`);
      throw Error(`User with ${uid} not found!`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUsersByExpenseId = async (expenseId: string): Promise<Array<User>> => {
  try {
    const expense: Expense = await getExpenseById(expenseId);
    const { users: expenseUsers } = expense;
    const userArray = expenseUsers.map((user) => getUserByUid(user.uid));
    const users = await Promise.all(userArray);
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { createUser, updateUser, getUsersByExpenseId, getUserByUid };
