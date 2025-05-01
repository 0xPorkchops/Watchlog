import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './db';
import { createUser, getUsers } from './userHandlers';
import 'dotenv/config'; 
import { clerkMiddleware } from '@clerk/express'
import { OMDB } from './movieAPI';
import type { MoviePromise } from './movieAPI';

const app = express();
const movie_api = new OMDB();
const PORT = 3000;
dotenv.config();
// await connectDB();
// app.use(clerkMiddleware())

app.use(helmet());

app.use(express.json());

app.post('/createUser', createUser);

app.get('/getUsers', getUsers);

app.post('/searchMovie', movie_api.expressIO.bind(movie_api));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});