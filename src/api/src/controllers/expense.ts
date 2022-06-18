import { db, auth } from '../db/firebase';
import { collection, doc, getDoc, query, setDoc, updateDoc } from 'firebase/firestore';
import { User, IUser } from '../models/user';
import { Expense, IExpense } from '../models/expense';

const getExpenseById = async (id: string): Promise<Expense> => {
  try {
    const expenseDocRef = db.collection('Expenses').doc(id);
    const expenseDocSnap = await expenseDocRef.get();

    if (expenseDocSnap.exists) {
      const expense: Expense = Expense.create(expenseDocSnap.data());
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
