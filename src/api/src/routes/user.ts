import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createUser } from '../controllers/user';
const router = express.Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  try {
    await createUser(username, email, password);
    return res.status(200).json({ message: `Created ${username}` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

export { router };
