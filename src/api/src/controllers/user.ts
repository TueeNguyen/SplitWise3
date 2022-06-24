import { db, auth } from '../db/firebase';
import { DocumentReference, DocumentSnapshot, FieldPath } from 'firebase-admin/firestore';
import { User } from '../models/user';
import { getExpenseById } from './expense';
import { Expense } from '../models/expense';
interface LooseObject {
  [key: string]: any;
}

const createUser = async (username: string, email: string, password: string): Promise<string> => {
  try {
    const { uid } = await auth.createUser({ email, password });
    const user: User = new User(uid, email, username);
    const userDocRef = db.collection('Users').doc(uid);
    await userDocRef.create(Object.assign({}, user));

    return `User ${uid} ${username} is created`;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateUser = async (uid: string, username?: string, avatar?: string): Promise<string> => {
  try {
    const updateObj: LooseObject = {};
    console.log({ username, avatar });
    if (username) {
      updateObj.username = username;
    } else if (avatar) {
      updateObj.avatar = avatar;
    } else {
      throw 'No username or avatar specified to update';
    }

    const userDocRef = db.collection('Users').doc(uid);
    const userDocSnapShot = await userExists(uid);
    if (userDocSnapShot) {
      await userDocRef.update(Object.assign({}, updateObj));
      return `Updated user ${uid}`;
    }
    throw `User ${uid} doesn't exist`;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const userExists = async (uid: string): Promise<DocumentSnapshot | null> => {
  try {
    const userDocRef = db.collection('Users').doc(uid);
    const docSnapShot = await userDocRef.get();
    if (docSnapShot.exists) {
      return docSnapShot;
    }
    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUserByUid = async (uid: string): Promise<User> => {
  try {
    const userDocSnapShot = await userExists(uid);
    if (userDocSnapShot) {
      const { username, email } = userDocSnapShot.data() as User;
      const user: User = new User(uid, username, email);
      return user;
    }
    throw `User ${uid} doesn't exist`;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// TODO: prototype can be improved to indicate functionality
const getUsers = async (userIds: Array<string>, expenseId?: string): Promise<Array<User>> => {
  try {
    const usersSnapshot = await db
      .collection('Users')
      .where(FieldPath.documentId(), 'in', userIds)
      .get();
    const users: Array<User> = [];
    usersSnapshot.forEach((docSnapshot) => users.push(docSnapshot.data() as User));
    return users;
    // const expense: Expense = await getExpenseById(expenseId);
    // const { userIds: expenseUsers } = expense;
    // const userArray = expenseUsers.map((uid) => getUserByUid(uid));
    // const users = await Promise.all(userArray);
    // return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { createUser, updateUser, getUsers, getUserByUid };
