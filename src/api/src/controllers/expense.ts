import { db } from '../db/firebase';
import { Expense } from '../models/expense';
import uniqid from 'uniqid';
import { UserRole } from '../models/userRole';
import { FieldPath } from 'firebase-admin/firestore';
import { User } from '../models/user';
import { getUsers } from './user';
import { getUserRolesByExpenseId } from './userRole';
import { createSplitForm, getSplitForm, updateSplitForm } from './splitForm';
import { SplitForm, SplitFormElem } from '../models/splitForm';
import { createReceiptForm, getReceiptForm, updateReceiptForm } from './receiptForm';
import { ReceiptFormElem } from '../models/receiptForm';
import { createReceiptImgForm, getReceiptImgForm, updateReceiptImgForm } from './receiptImgForm';
import { ReceiptImgForm, ReceiptImgFormElem } from '../models/receiptImgForm';

const createExpense = async (name: string, date: string, avatar?: string): Promise<string> => {
  try {
    const [receiptImgFormId, receiptFormId, splitFormId] = await Promise.all([
      createReceiptImgForm(),
      createReceiptForm(),
      createSplitForm()
    ]);
    const id = uniqid();
    const expenseDocRef = db.collection('Expenses').doc(id);

    //TODO: add owner user && respective userRole

    const expense: Expense = new Expense(
      name,
      date,
      avatar,
      receiptImgFormId,
      receiptFormId,
      splitFormId
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

export { getExpenseById, createExpense, updateExpense };
