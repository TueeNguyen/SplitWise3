import { db } from '../db/firebase';
import { Expense } from '../models/expense';
import uniqid from 'uniqid';
import { getUsers } from './user';
import { createUserRole, getUserRolesByExpenseId, getUserRolesByUserId } from './userRole';
import { createSplitForm, getSplitForm, updateSplitForm } from './splitForm';
import { SplitForm, SplitFormElem } from '../models/splitForm';
import { createReceiptForm, getReceiptForm, updateReceiptForm } from './receiptForm';
import { ReceiptFormElem } from '../models/receiptForm';
import { createReceiptImgForm, getReceiptImgForm, updateReceiptImgForm } from './receiptImgForm';
import { ReceiptImgForm, ReceiptImgFormElem } from '../models/receiptImgForm';
import { DocumentReference, DocumentSnapshot, FieldPath } from 'firebase-admin/firestore';
import { encryptPassword } from './password';
/**
 * - Add res.locals.uid to userIds
 * - Add a record to UserRoles document
 * @param name
 * @param date
 * @param avatar
 * @returns
 */
const createExpense = async (
  name: string,
  date: string,
  uid: string,
  avatar?: string
): Promise<string> => {
  try {
    const [receiptImgFormId, receiptFormId, splitFormId] = await Promise.all([
      createReceiptImgForm(),
      createReceiptForm(),
      createSplitForm(uid)
    ]);

    const id = uniqid();
    const expenseDocRef = db.collection('Expenses').doc(id);

    const password = uniqid.time();
    const hashedPassword = await encryptPassword(password);

    //TODO: get userRoles
    await createUserRole(uid, id);

    const expense: Expense = new Expense(
      name,
      date,
      avatar,
      receiptImgFormId,
      receiptFormId,
      splitFormId,
      [uid],
      hashedPassword
    );
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
 * @returns Expense object with extra fields **userRoles**, **users**
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

      expense.setReceiptImgForm = await getReceiptImgForm(expense.receiptImgFormId);
      expense.setReceiptForm = await getReceiptForm(expense.receiptFormId);
      expense.setSplitForm = await getSplitForm(expense.splitFormId);
      console.log(expense);
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

const updateExpense = async (id: string, expenseObj: any): Promise<string> => {
  try {
    // need to update all the forms first
    await updateSplitForm(
      expenseObj.splitFormId,
      SplitFormElem.createSplitFormElemArray(expenseObj.splitForm)
    );
    await updateReceiptForm(
      expenseObj.receiptFormId,
      ReceiptFormElem.createReceiptFormElemArray(expenseObj.receiptForm)
    );
    await updateReceiptImgForm(
      expenseObj.receiptImgFormId,
      ReceiptImgFormElem.createReceiptImgFormElemArray(expenseObj.receiptImgForm)
    );

    // const expenseDocRef = db.collection('Expenses').doc(id);
    // const expense = Expense.create(expenseObj);
    // await expenseDocRef.update({ ...expense });
    return 'Updated expense';
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getExpenses = async (uid: string): Promise<Array<any>> => {
  try {
    const userRoles = await getUserRolesByUserId(uid);
    console.log(userRoles);
    const expenseIds = userRoles.map((data) => data.expenseId);
    const expenseSnapshot = await db
      .collection('Expenses')
      .where(FieldPath.documentId(), 'in', expenseIds)
      .get();
    const expenses: any = [];
    expenseSnapshot.forEach((snapshot) => expenses.push(snapshot.data()));
    console.log(expenses);
    return expenses;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteExpense = async () => {
  // delete User roles
  // delete all forms
  // delete expense
  // socket emit deleted expense
};

export { getExpenseById, createExpense, updateExpense, getExpenses };
