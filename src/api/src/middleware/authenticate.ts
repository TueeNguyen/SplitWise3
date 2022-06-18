import { NextFunction, Request, Response } from 'express';
import { auth } from '../db/firebase';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.body;
  const [, token] = authorization.split('Bearer ');
  if (!authorization || !authorization.startsWith('Bearer') || token.length < 1) {
    return res
      .status(401)
      .send({ message: `Missing or wrong authorization header, unauthorized!` });
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      email: decodedToken.email
    };
    return next();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
