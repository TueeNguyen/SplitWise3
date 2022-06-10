import express, { Express } from 'express';
import TestingRouter from './routes/testing';
import { Server } from 'socket.io';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
const app: any = express();

const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const testingRouter = TestingRouter(io);
app.use('/', testingRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

const PORT = process.env.PORT ?? 6060;
io.on('connection', (socket) => {
  console.log(socket.id);
});
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
