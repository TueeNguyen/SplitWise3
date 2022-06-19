import { db } from '../db/firebase';
import { Expense } from '../models/expense';
import uniqid from 'uniqid';
import { UserRole } from '../models/userRole';
import { FieldPath } from 'firebase-admin/firestore';
import { User } from '../models/user';
import { getUsers } from './user';
import { getUserRolesByExpenseId } from './userRole';

const createExpense = async (name: string, date: string, avatar?: string): Promise<string> => {
  try {
    const id = uniqid();
    const expenseDocRef = db.collection('Expenses').doc(id);
    const expense: Expense = new Expense(name, date, avatar);
    expense.setId = id;
    await expenseDocRef.create({ ...expense });
    return `Expense ${name} created`;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
/**
 *
 * @param id
 * @returns an extended instance of Expense that has **userRoles** and **users** array populated so front-end
 * doesn't have to call api to get userRoles
 */
const getExpenseById = async (id: string): Promise<Expense> => {
  try {
    const expenseDocRef = db.collection('Expenses').doc(id);
    const expenseDocSnap = await expenseDocRef.get();

    if (expenseDocSnap.exists) {
      const expense: Expense = Expense.create(expenseDocSnap.data() as Expense);

      // get and add userRoles to expense
      expense.setUserRoles = await getUserRolesByExpenseId(id);

      // get and add users to expense
      expense.setUsers = await getUsers(expense.userIds);

      return expense;
    } else {
      console.error(`Expense ${id} not found`);
      throw `Expense ${id} not found`;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateExpense = async (id: string, expenseObj: Expense): Promise<string> => {
  try {
    const expenseDocRef = db.collection('Expenses').doc(id);
    const expense = Expense.create(expenseObj);
    await expenseDocRef.update({ ...expense });
    return 'Updated expense';
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getExpenseById, createExpense, updateExpense };
