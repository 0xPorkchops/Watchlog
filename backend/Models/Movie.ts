import mongoose, { Schema, Document } from 'mongoose';

export interface Movie extends Document {
    id: number;
    title: string;
    description: string;
    imdb_rating: number;
    year: number;
}