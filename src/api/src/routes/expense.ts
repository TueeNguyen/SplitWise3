import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import {
  addUserToExpense,
  createExpense,
  getExpenseById,
  getExpenses,
  updateExpense
} from '../controllers/expense';
import { isAuthenticated } from '../middleware/authenticate';
import { isAuthorized } from '../middleware/authorize';
import { SOCKET_EVENTS } from '../constants';
import { upload } from '../middleware/storage';
import { uploadImage, uploadReceiptImgs } from '../controllers/storage';
import { UploadedFile } from 'express-fileupload';
const router = express.Router();

function ExpenseRouter(io: Server) {
  router.put('/join/:id', isAuthenticated, async (req: Request, res: Response) => {
    const { id: expenseId } = req.params;
    const { password } = req.body;
    const { uid } = res.locals;
    try {
      await addUserToExpense(uid, expenseId, password);
      io.emit(SOCKET_EVENTS.USER_JOINED_EXPENSE, { uid, expenseId });
      return res.status(200).json({ message: `Added user ${uid} to expense ${expenseId}` });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  router.get('/:id', isAuthenticated, isAuthorized, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const expense = await getExpenseById(id);
      return res.status(200).json({ data: expense });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  router.get('/', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const expenses = await getExpenses(res.locals.uid);
      return res.status(200).json({ data: expenses });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  router.post('/create', isAuthenticated, upload, async (req: Request, res: Response) => {
    const { name, date } = req.body;
    const avatar = res.locals.imageUrl;
    try {
      const message = await createExpense(name, date, res.locals.uid, avatar);
      io.emit(SOCKET_EVENTS.EXPENSE_CREATED);
      return res.status(200).json({ message });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  router.put('/receiptImg/update', async (req: Request, res: Response) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No new images/files are uploaded');
        return res.status(204).json({ message: 'No new images/files are uploaded' });
      }
      const name_n_urls = await uploadReceiptImgs(req.files, req.body.receiptImgFormId);
      return res.status(200).json({ data: name_n_urls });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  router.put('/update', async (req: Request, res: Response) => {
    const { id, expenseObj } = req.body;
    try {
      const message = await updateExpense(id, expenseObj);
      io.emit(SOCKET_EVENTS.EXPENSE_UPDATED);
      return res.status(200).json({ message });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });

  return router;
}

export default ExpenseRouter;
