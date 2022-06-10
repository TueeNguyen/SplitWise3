import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

const router = express.Router();

function TestingRouter(io: Server) {
  router.get('/increment', (req: Request, res: Response, next: NextFunction) => {
    const num = ++req.body.number;
    io.emit('increment', num);
    return res.status(200).json({
      number: num
    });
  });
  return router;
}

export = TestingRouter;
