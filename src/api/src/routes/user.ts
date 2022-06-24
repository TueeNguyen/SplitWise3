import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createUser, getUserByUid, updateUser } from '../controllers/user';
import { isAuthenticated } from '../middleware/authenticate';

const router = express.Router();

router.get('/:uid', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const user = await getUserByUid(uid);
    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

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
