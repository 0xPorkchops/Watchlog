import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './db';
import { createUser, getUsers } from './userHandlers';

const app = express();
const PORT = 3000;
dotenv.config();
await connectDB();

app.use(helmet());

app.use(express.json());

app.post('/createUser', createUser);

app.get('/getUsers', getUsers);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});