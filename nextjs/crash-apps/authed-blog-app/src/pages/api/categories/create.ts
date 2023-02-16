import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { isString, trim } from 'lodash'
import Category, { Category_T } from "@/models/Category";
import { HydratedDocument } from "mongoose";



export default async function categoriesHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const {body:reqBody, method} = req;
    if (method!=="POST"){
        return res.status(404).json({error: "Requested route not found"})
    }
    const { name } = reqBody;

    try {
        if (!name?.length && !isString(name)) {
            return res.status(400).json({ error: "Fields are missing" });
        }

        const slug = trim(name).replace(/ /g, "-");

        const newCategory:HydratedDocument<Category_T> = new Category({name, slug});
        await newCategory.save();
        return res.json(newCategory);

    } catch (error) {
        const myError = error as any;
        if (myError.name === "MongoServerError" && myError.code===11000){
            return res.status(400).json({error: "Category already exist"})
        }
        console.log(error);
        return res.status(400).json({error: "Error Happened"});
    }

}