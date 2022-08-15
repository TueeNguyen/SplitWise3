import { NextFunction, Request, Response } from 'express';
import { authAdmin } from '../firebase/firebase-admin';
import asyncHandler from 'express-async-handler';
import { getUserByUid } from '../controllers/user';
import { getUserRolesByExpenseId, isUserInExpense } from '../controllers/userRole';

const isAuthorized = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id: expenseId } = req.params;
  console.log(req.body);
  try {
    const authorized = await isUserInExpense(res.locals.uid, expenseId);
    if (!authorized) {
      res.status(403);
      throw `User ${res.locals.uid} is not authorized to access expense ${expenseId}`;
    }
    next();
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export { isAuthorized };
