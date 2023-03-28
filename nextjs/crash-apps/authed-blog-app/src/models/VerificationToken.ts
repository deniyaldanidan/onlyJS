import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";



const verificationTokenSchema = new Schema({
    token: { type: String },
    expires: { type: Date },
    identifier: { type: String },
})

export type VerificationToken_T = InferSchemaType<typeof verificationTokenSchema> & {
    _id: Types.ObjectId
};

const VerificationToken: Model<VerificationToken_T> = mongoose.models?.VerificationToken || mongoose.model<VerificationToken_T>('VerificationToken', verificationTokenSchema)

export default VerificationToken;