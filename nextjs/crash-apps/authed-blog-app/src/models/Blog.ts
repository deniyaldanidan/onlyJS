import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";
import Category from '../models/Category';

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    author: {
        type: String,
        required: true
    },
    categories: [{ type: Schema.Types.ObjectId, ref: Category.modelName, required: true }]
}, {timestamps: true});

export type Blog_T = InferSchemaType<typeof BlogSchema>;

export interface BlogWId_T extends Blog_T {
    _id: Types.ObjectId
};


const Blog: Model<Blog_T> = mongoose.models?.Blog || mongoose.model<Blog_T>('Blog', BlogSchema)

export default Blog;

