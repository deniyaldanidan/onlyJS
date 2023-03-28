import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { isObjectIdOrHexString, ObjectId, Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";



export default async function postCreateHandler(req: NextApiRequest, res: NextApiResponse) {

    try {
        await dbConnect();

        const { title, body, excerpt, author, categories } = req.body;

        if (!title?.length || !body?.length || !excerpt?.length || !author?.length || !categories?.length || !categories?.every((cat: ObjectId) => isObjectIdOrHexString(cat))) {
            return res.status(400).json({ error: 'Missing fields' })
        }

        if (categories.length > 4){
            return res.status(400).json({error: "Category range is exceeded"});
        }

        const validCats: number = await Category.countDocuments({ _id: { $in: categories } }).lean().exec()

        if (validCats !== categories.length) {
            return res.status(400).json({ error: "Invalid category id" })
        }

        const newBlog = new Blog({ title, body, excerpt, author, slug: (title as string).toLowerCase().replace(/ /g, "_"), categories: categories.map((cat: string) => new Types.ObjectId(cat)) });

        await newBlog.save();
        
        return res.json(newBlog);
    } catch (error) {
        const myError = error as any;
        if (myError.name === "MongoServerError" && myError.code === 11000) {
            return res.status(400).json({ error: "Title already exist" })
        }
        console.log(error)
        return res.json({ error: "An error happened" })
    }

}