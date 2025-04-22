import mongoose, { Schema, Document } from 'mongoose';
import type { User } from './User';

export interface Guild extends Document {
    id: number;
    name: string;
    members: User[];
}

const GuildSchema: Schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model<Guild>('Guild', GuildSchema);