import { dbAdmin } from '../firebase/firebase-admin';
import { Expense } from '../models/expense';
import uniqid from 'uniqid';
import { getUsers } from './user';
import { createUserRole, getUserRolesByExpenseId, getUserRolesByUserId } from './userRole';
import { addNewUserToSplitForm, createSplitForm, getSplitForm, updateSplitForm } from './splitForm';
import { SplitForm, SplitFormElem } from '../models/splitForm';
import { createReceiptForm, getReceiptForm, updateReceiptForm } from './receiptForm';
import { ReceiptFormElem } from '../models/receiptForm';
import { createReceiptImgForm, getReceiptImgForm, updateReceiptImgForm } from './receiptImgForm';
import { ReceiptImgForm, ReceiptImgFormElem } from '../models/receiptImgForm';
import { FieldPath, FieldValue } from 'firebase-admin/firestore';
import { LooseObject } from '../models/util';

const getExpenseRef = (id: string) => dbAdmin.collection('Expenses').doc(id);

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
    const expenseDocRef = dbAdmin.collection('Expenses').doc(id);

    const password = uniqid.time();

    //TODO: get userRoles
    await createUserRole(uid, id, 'Owner');

    const expense: Expense = new Expense(
      name,
      date,
      avatar,
      receiptImgFormId,
      receiptFormId,
      splitFormId,
      [uid],
      password
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
    const expenseDocRef = dbAdmin.collection('Expenses').doc(id);
    const expenseDocSnap = await expenseDocRef.get();

    if (expenseDocSnap.exists) {
      const expense: Expense = Expense.create(expenseDocSnap.data() as LooseObject);

      // get and add userRoles to expense
      expense.setUserRoles = await getUserRolesByExpenseId(id);

      // get and add users to expense
      expense.setUsers = await getUsers(expense.userIds);

      expense.setReceiptImgForm = await getReceiptImgForm(expense.receiptImgFormId);
      expense.setReceiptForm = await getReceiptForm(expense.receiptFormId);
      expense.setSplitForm = await getSplitForm(expense.splitFormId);
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
const checkNewImage = (expenseObj: any) => {
  expenseObj.receiptImgForm.every((elem: any) => elem.hasOwnProperty('receiptImg'));
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

    // Not needed since client will call '/epxense/receiptImg/update' to upload any new image and update
    await updateReceiptImgForm(
      expenseObj.receiptImgFormId,
      ReceiptImgFormElem.createReceiptImgFormElemArray(expenseObj.receiptImgForm)
    );

    const expenseDocRef = dbAdmin.collection('Expenses').doc(id);
    const expense = Expense.create(expenseObj);

    await expenseDocRef.update({ ...expense });
    console.log(`Updated expense ${id}`);
    return 'Updated expense';
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getExpenses = async (uid: string): Promise<Array<any>> => {
  try {
    const userRoles = await getUserRolesByUserId(uid);
    const expenseIds = userRoles.map((data) => data.expenseId);
    const expenseSnapshot = await dbAdmin
      .collection('Expenses')
      .where(FieldPath.documentId(), 'in', expenseIds)
      .get();
    const expenses: any = [];
    expenseSnapshot.forEach((snapshot) => expenses.push(snapshot.data()));
    return expenses;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addUserToExpense = async (
  uid: string,
  expenseId: string,
  password: string
): Promise<void> => {
  try {
    const expense = await getExpenseById(expenseId);
    if (expense.userIds.findIndex((userId) => uid === userId) > 0) {
      throw 'Already in expense';
    }
    if (!(password === expense.password)) {
      throw 'Wrong password';
    }
    const expenseRef = getExpenseRef(expenseId);
    await expenseRef.update('userIds', FieldValue.arrayUnion(uid));
    await createUserRole(uid, expenseId, 'Member');
    await addNewUserToSplitForm(uid, expense.splitFormId);
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

export { getExpenseById, createExpense, updateExpense, getExpenses, addUserToExpense };
