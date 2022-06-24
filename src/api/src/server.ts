import express from 'express';
import { router as userRouter } from './routes/user';
import ExpenseRouter from './routes/expense';
import { Server } from 'socket.io';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
require('dotenv').config();

// initializing
const app = express();
const server = require('http').createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// configure express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const expenseRouter = ExpenseRouter(io);

app.use('/api/user', userRouter);
app.use('/api/expense', expenseRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

// start server
const PORT = process.env.PORT ?? 6060;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
