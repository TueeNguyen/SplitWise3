import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createUser, updateUser } from '../controllers/user';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const message = await createUser(username, email, password);
    return res.status(200).json({ message });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.put('/update', async (req: Request, res: Response) => {
  const { uid, username, avatar } = req.body;
  try {
    const message = await updateUser(uid, username, avatar);
    return res.status(200).json({ message });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

export { router };
