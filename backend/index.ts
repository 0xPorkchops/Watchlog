import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { clerkMiddleware } from '@clerk/express';
import 'dotenv/config';

// MongoDB connection setup
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI!;
const PORT = 3000;

// Handler Imports
import {
  createUser,
  getUsers
} from './MongoHandlers/userHandlers';

import {
  createMovie,
  addToWatchList,
  getWatchList,
  addToWatched,
  getWatched,
  addToLiked,
  getLiked,
  addToDisliked,
  getDisliked
} from './MongoHandlers/movieHandlers';

import {
  createGuild,
  addToGuild,
  removeFromGuild,
  getGuild
} from './MongoHandlers/guildHandlers';

// Create app
const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(clerkMiddleware()); // Clerk must come before any route handlers

// --- User Routes ---
app.post('/createUser', createUser);
app.get('/getUsers', getUsers);

// --- Movie Routes ---
app.post('/createMovie', createMovie);
app.post('/users/watchlist', addToWatchList);
app.get('/users/:id/watchlist', getWatchList);

app.post('/users/watched', addToWatched);
app.get('/users/:id/watched', getWatched);

app.post('/users/liked', addToLiked);
app.get('/users/:id/liked', getLiked);

app.post('/users/disliked', addToDisliked);
app.get('/users/:id/disliked', getDisliked);

// --- Guild Routes ---
app.post('/guilds', createGuild);
app.post('/guilds/add', addToGuild);
app.post('/guilds/remove', removeFromGuild);
app.get('/guilds/:id', getGuild);

// --- Connect to MongoDB ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });