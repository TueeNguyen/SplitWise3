import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createExpense, getExpenseById, updateExpense } from '../controllers/expense';
import { isAuthenticated } from '../middleware/authenticate';

const router = express.Router();

router.get('/:id', isAuthenticated, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await getExpenseById(id);
    return res.status(200).json({ data: expense });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});
router.post('/create', async (req: Request, res: Response) => {
  const { name, date, avatar } = req.body;
  try {
    const message = await createExpense(name, date, avatar);
    return res.status(200).json({ message });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});
router.put('/update', async (req: Request, res: Response) => {
  const { id, expenseObj } = req.body;
  try {
    const message = await updateExpense(id, expenseObj);
    return res.status(200).json({ message });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

export { router };
