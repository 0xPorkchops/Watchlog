import mongoose, { Schema, Document } from 'mongoose';
import type { Library } from './Library';

export interface User extends Document {
    id: number;
    name: string;
    email: string;
    library: Library;
}

const UserSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    library: {
      watched: [{ type: Number }],        
      watch_list: [{ type: Number }],
      liked: [{ type: Number }],
      disliked: [{ type: Number }]
    }
  });

export default mongoose.model<User>('User', UserSchema);