import { dbAdmin } from '../firebase/firebase-admin';
import { UserRole } from '../models/userRole';
import uniqid from 'uniqid';

const createUserRole = async (uid: string, expenseId: string, role: string) => {
  try {
    const id = uniqid();
    const userRoleDocRef = dbAdmin.collection('UserRoles').doc(id);
    const userRole = new UserRole(id, uid, `${role}`, expenseId);
    await userRoleDocRef.create({ ...userRole });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUserRolesByExpenseId = async (expenseId: string) => {
  try {
    const userRolesSnapshot = await dbAdmin
      .collection('UserRoles')
      .where('expenseId', '==', `${expenseId}`)
      .get();
    const userRoles: Array<UserRole> = [];
    userRolesSnapshot.forEach((docSnapshot) => userRoles.push(docSnapshot.data() as UserRole));
    return userRoles;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUserRolesByUserId = async (userId: string) => {
  try {
    const userRolesSnapshot = await dbAdmin
      .collection('UserRoles')
      .where('uid', '==', `${userId}`)
      .get();
    const userRoles: Array<UserRole> = [];
    userRolesSnapshot.forEach((docSnapshot) => userRoles.push(docSnapshot.data() as UserRole));
    return userRoles;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const isUserInExpense = async (userId: string, expenseId: string): Promise<boolean> => {
  try {
    const userRoleSnapshot = await dbAdmin
      .collection('UserRoles')
      .where('uid', '==', `${userId}`)
      .where('expenseId', '==', `${expenseId}`)
      .get();

    if (userRoleSnapshot.empty) {
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getUserRolesByExpenseId, createUserRole, getUserRolesByUserId, isUserInExpense };
