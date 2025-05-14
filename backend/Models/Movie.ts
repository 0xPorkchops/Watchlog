import mongoose, { Schema, Document } from 'mongoose';

export interface Movie extends Document {
    id: number;
    title: string;
    description: string;
    imdb_rating: number;
    year: number;
}

const MovieSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    imdb_rating: { type: Number, required: true, min: 0, max: 10 },
    year: { type: Number, required: true }
  });
  
  export default mongoose.model<Movie>('Movie', MovieSchema);