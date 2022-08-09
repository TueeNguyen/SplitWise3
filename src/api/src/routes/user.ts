import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUser, getUserByUid, updateUser } from '../controllers/user';
import { auth } from '../firebase/firebase';
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

router.post('/login', async (req: Request, res: Response) => {
  try {
    // TODO: create login func and put it into auth route and auth controller
    const { email, password } = req.body;
    console.log(email, password);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const accessToken = await user.getIdToken();
    return res.status(200).json({ data: { accessToken, uid: user.uid } });
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
