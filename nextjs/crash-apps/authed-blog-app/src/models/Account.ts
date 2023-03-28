import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";
import User from "./User";


const accountSchema = new Schema({
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: User.modelName },
    oauth_token_secret: { type: String },
    oauth_token: { type: String },
    session_state: { type: String },
    refresh_token_expires_in: {type: Number}
})



export type Account_T = InferSchemaType<typeof accountSchema>;

export interface AccountWId_T extends Account_T {
    _id: Types.ObjectId
}

const Account: Model<Account_T> = mongoose.models?.Account || mongoose.model<Account_T>('Account', accountSchema)

export default Account;