import { db, auth } from '../db/firebase';
import { collection, doc, getDoc, query, setDoc, updateDoc } from 'firebase/firestore';
import { User, IUser } from '../models/user';
import { Expense, IExpense } from '../models/expense';

const getExpenseById = async (id: string): Promise<IExpense> => {
  try {
    const expenseRef = doc(db, 'Expenses', id);
    const expenseSnap = await getDoc(expenseRef);
    if (expenseSnap.exists()) {
      const expenseObj = expenseSnap.data();
      const expense = Expense.create(expenseObj);
      return expense;
    } else {
      console.error(`Expense ${id} not found`);
      throw Error(`Expense ${id} not found`);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getExpenseById };
