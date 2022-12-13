import { ErrorRequestHandler, RequestHandler } from "express";
import { EntityNotFoundError, QueryFailedError, TypeORMError } from "typeorm";
import { AppDataSource } from "../data-source";
import { Blog } from "../entity/Blog";

const BlogRepository = AppDataSource.getRepository(Blog);

export const getAllBlogs:RequestHandler = async (req, res, next)=>{
    try {
        const blogs = await BlogRepository.find()
        return res.json(blogs)
    } catch (error) {
        next(error)
    }
}

export const findBlog:RequestHandler = async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        if (!id){
            return res.status(404).json({error: "Invalid Id"})
        }
        const blog = await BlogRepository.findOneByOrFail({id});
        return res.json({blog, time: new Date(blog.created_on).toLocaleString()});
    } catch (error) {
        next(error);
    }
}

export const createBlog:RequestHandler = async(req, res, next)=>{
    try {
        const {title, excerpt, content, author} = req.body;
        if (typeof title !== "string" || typeof excerpt !== "string" || typeof content !== "string" || typeof author !== "string"){
            return res.status(409).json({error: "Invalid Values"})
        }
        const newBlog = BlogRepository.create({
            title,
            excerpt,
            content,
            author
        })
        await BlogRepository.save(newBlog);
        return res.json(newBlog);
    } catch (error) {
        next(error);
    }
}

export const updateBlog:RequestHandler = async(req, res, next)=>{
    try {
        const {id, title, excerpt, content} = req.body;
        if (!parseInt(id)){
            return res.status(409).json({error: "Invalid Id"})
        }
        if (typeof title !== "string" || typeof excerpt !== "string" || typeof content !== "string"){
            return res.status(409).json({error: "Invalid Values"})
        }
        const targetBlog = await BlogRepository.findOneByOrFail({id});
        targetBlog.title = title;
        targetBlog.excerpt = excerpt;
        targetBlog.content = content;
        await BlogRepository.save(targetBlog);
        return res.json(targetBlog);
    } catch (error) {
        next(error)
    }
}

export const deleteBlog:RequestHandler = async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        if (!id){
            return res.status(409).json({error: "Invalid Id"})
        }
        const targetBlog = await BlogRepository.findOneByOrFail({id});
        await BlogRepository.remove(targetBlog);
        return res.json({success: true})
    } catch (error) {
        next(error)
    }
}

export const blogErrorHandler:ErrorRequestHandler = async(err, req, res, next)=>{
    const error = err as Error | TypeORMError;
    if (error instanceof EntityNotFoundError){
        // console.log(error.message)
        return res.status(404).json({error: "Sorry, Couldn't Find the Blog"})
    }
    if (error instanceof QueryFailedError){
        if (error.driverError.code === "23502"){
            return res.status(409).json({error: `Missing ${error.driverError.column} column`});
        } else{
            // console.log(error.driverError, "\n\n", error.message, error.query);
            console.log(error.driverError.code, error.message)
            return res.status(409).json({error: "Query Failed"})
        }
    }
    next(err);
}