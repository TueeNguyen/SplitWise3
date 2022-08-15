import { NextFunction, Request, Response } from 'express';
import { authAdmin } from '../firebase/firebase-admin';
import asyncHandler from 'express-async-handler';
import { getUserByUid } from '../controllers/user';

const isAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(401);
    throw 'Missing or wrong authorization header, unauthorized!';
  }

  const [, token] = authorization.split('Bearer ');

  if (token.length < 1) {
    res.status(401);
    throw 'Missing or wrong authorization header, unauthorized!';
  }

  try {
    const decodedToken = await authAdmin.verifyIdToken(token);
    const currentUser = await getUserByUid(decodedToken.uid);
    res.locals = { ...res.locals, currentUser, uid: decodedToken.uid };
    next();
  } catch (err: any) {
    console.error(err);
    if (err.code === 'auth/id-token-expired') {
      res.status(401);
      throw 'Token expires';
    }
    throw err;
  }
});

export { isAuthenticated };
