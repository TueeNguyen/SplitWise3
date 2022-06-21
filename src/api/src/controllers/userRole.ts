import { db } from '../db/firebase';
import { UserRole } from '../models/userRole';
import uniqid from 'uniqid';
const createUserRole = async (uid: string, expenseId: string) => {
  try {
    const id = uniqid();
    const userRoleDocRef = db.collection('UserRoles').doc(id);
    const userRole = new UserRole(id, uid, 'Owner', expenseId);
    await userRoleDocRef.create({ ...userRole });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUserRolesByExpenseId = async (expenseId: string) => {
  try {
    const userRolesSnapshot = await db
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

export { getUserRolesByExpenseId, createUserRole };
