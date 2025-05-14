import User from '../Models/User';
import Movie from '../Models/Movie';

import type { Request, Response } from 'express';

export async function createMovie(req: Request, res: Response): Promise<void> {
    try {
        const movie = new Movie(req.body);
        const saved = await movie.save();
        res.status(201).json(saved);
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ error: error.message });
    }
}

export async function addToWatchList(req: Request, res: Response): Promise<void> {
    try {
        const { userId, movieId } = req.body;
        const user = await User.findOne({ id: userId });
        const movie = await Movie.findOne({ id: movieId });

        if (!user || !movie) throw new Error("User or movie not found");

        user.library.watch_list.push(movie.id);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ error: error.message });
    }
}

export async function getWatchList(req: Request, res: Response): Promise<void> {
    try {
        const userId = Number(req.params.id);
  
        const user = await User.findOne({ id: userId }).populate('library.watch_list');
  
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
  
        res.json(user.library.watch_list);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
}

export async function addToWatched(req: Request, res: Response): Promise<void> {
    try {
        const { userId, movieId } = req.body;
        const user = await User.findOne({ id: userId });
        const movie = await Movie.findOne({ id: movieId });
  
        if (!user || !movie) throw new Error("User or movie not found");
  
        user.library.watched.push(movie.id);
        await user.save();
  
        res.status(200).json(user.library.watched);
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ error: error.message });
    }
}

export async function getWatched(req: Request, res: Response): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const user = await User.findOne({ id: userId }).populate('library.watched');
  
        if (!user) throw new Error('User not found');
  
        res.json(user.library.watched);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
}

export async function addToLiked(req: Request, res: Response): Promise<void> {
    try {
        const { userId, movieId } = req.body;
        const user = await User.findOne({ id: userId });
        const movie = await Movie.findOne({ id: movieId });
  
        if (!user || !movie) throw new Error("User or movie not found");
  
        user.library.liked.push(movie.id);
        await user.save();
  
        res.status(200).json(user.library.liked);
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ error: error.message });
    }
}

export async function getLiked(req: Request, res: Response): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const user = await User.findOne({ id: userId }).populate('library.liked');
  
        if (!user) throw new Error('User not found');
  
        res.json(user.library.liked);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
  }
  
export async function addToDisliked(req: Request, res: Response): Promise<void> {
    try {
        const { userId, movieId } = req.body;
        const user = await User.findOne({ id: userId });
        const movie = await Movie.findOne({ id: movieId });
  
        if (!user || !movie) throw new Error("User or movie not found");
  
        user.library.disliked.push(movie.id);
        await user.save();
  
        res.status(200).json(user.library.disliked);
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ error: error.message });
    }
  }

export async function getDisliked(req: Request, res: Response): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const user = await User.findOne({ id: userId }).populate('library.disliked');
  
        if (!user) throw new Error('User not found');
  
        res.json(user.library.disliked);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
  }
