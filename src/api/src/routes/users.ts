import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.get('/users', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'hello'
  });
});

export = router;
