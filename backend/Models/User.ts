import mongoose, { Schema, Document } from 'mongoose';
import type { Library } from './Library';

export interface User extends Document {
    id: number;
    name: string;
    email: string;
    library: Library;
}

const UserSchema: Schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    library: {
        watched: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
        watch_list: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
        liked: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
        disliked: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
    },
});

export default mongoose.model<User>('User', UserSchema);