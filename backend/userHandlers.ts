import User from './Models/User';
import type { Request, Response } from 'express';

async function createUser(req: Request, res: Response) : Promise<void> {
  try {
    console.log(req.body);
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

async function getUsers(_req: Request, res: Response) : Promise<void> {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export {createUser, getUsers};