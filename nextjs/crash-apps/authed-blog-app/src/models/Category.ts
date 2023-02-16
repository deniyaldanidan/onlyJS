import mongoose, { InferSchemaType, Model, Types } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 36
    },
    slug : {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {timestamps: true});

export type Category_T = InferSchemaType<typeof CategorySchema>;

export type CategoryWId_T = {
    _id : Types.ObjectId
} & Category_T;

const Category: Model<Category_T> = mongoose.models?.Category ||  mongoose.model('Category', CategorySchema);

export default Category;