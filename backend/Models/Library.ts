import mongoose, { Schema, Document } from 'mongoose';
import type { Movie } from './Movie';

export interface Library {
    watched: Movie[];
    watch_list: Movie[];
    liked: Movie[];
    disliked: Movie[];
}
