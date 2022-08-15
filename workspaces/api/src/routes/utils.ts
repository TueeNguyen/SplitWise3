import express from 'express';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/healthcheck', async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ ping: 'pong' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

export { router };
