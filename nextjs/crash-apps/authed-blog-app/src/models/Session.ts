import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";
import User from "./User";



const sessionSchema = new Schema({
    expires: { type: Date },
    sessionToken: { type: String, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: User.modelName },
})


export type Session_T = InferSchemaType<typeof sessionSchema>;

export interface SessionWId_T extends Session_T {
    _id: Types.ObjectId
}

const Session: Model<Session_T> = mongoose.models?.Session || mongoose.model<Session_T>('Session', sessionSchema)

export default Session;