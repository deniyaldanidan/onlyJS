import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    emailVerified: { type: Date },
    image: { type: String },
    roles: {
        type: [String],
        default: ['user'], // available roles 'user', 'editor', 'admin'
    }
})

export type User_T = InferSchemaType<typeof userSchema>;
export interface UserWId_T extends User_T{
    _id: Types.ObjectId
}

const User: Model<User_T> = mongoose.models?.User || mongoose.model<User_T>('User',userSchema)

export default User;