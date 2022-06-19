import { db } from '../db/firebase';
import { UserRole } from '../models/userRole';

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

export { getUserRolesByExpenseId };
