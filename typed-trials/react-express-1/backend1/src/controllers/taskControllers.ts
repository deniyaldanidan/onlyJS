import { ErrorRequestHandler, RequestHandler } from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';

export const getAll: RequestHandler = async (req, res, next) => {
    try {
        const tasks = await Task.find({}).exec();
        return res.json(tasks);
    } catch (error) {
        next(error)
    }
}

export const createOne: RequestHandler = async (req, res, next) => {
    try {
        const { name, important, due, note, tags } = req.body;
        if (!name?.length) {
            return res.status(400).json({ error: "Fields are missing" })
        }
        const newTask = await Task.create({
            name,
            important,
            due: (typeof due === "string" && due?.length) ? due : undefined,
            note: (typeof note === "string" && note?.length) ? note : undefined,
            tags: (Array.isArray(tags) && tags?.length) ? tags : []
        });
        return res.json({ task: newTask, success: true })
    } catch (error) {
        next(error)
    }
}

export const updateOne: RequestHandler = async (req, res, next) => {
    try {
        const { id, name, important, due, note, tags } = req.body;
        if (!id){
            return res.status(400).json({error: "Id field is missing"})
        }
        const myTask = await Task.findById(id).exec();
        if (!myTask) {
            return res.status(400).json({ error: "Task doesn't exist" });
        }
        (typeof name === "string" && name?.length) && (myTask.name = name);
        (typeof important === "boolean") && (myTask.important = important);
        (due?.length) && (myTask.due = due);
        (typeof note === "string" && note?.length) && (myTask.note = note);
        (Array.isArray(tags) && tags?.length) && (myTask.tags = tags);
        const updTask = await myTask.save({ validateBeforeSave: true, });
        return res.json({ updatedTask: updTask, success: true })
    } catch (error) {
        next(error)
    }
}

export const toggImp: RequestHandler = async (req, res, next) => {
    try {
        const { id, important } = req.body;
        if (!id || typeof important !== "boolean"){
            return res.status(400).json({error: "Fields are missing"});
        }
        const myTask = await Task.findById(id).exec();
        if (!myTask) {
            return res.status(400).json({ error: "Task doesn't exist" });
        }
        myTask.important = important;
        const result = await myTask.save({ validateBeforeSave: true });
        return res.json({ toggledTask: result, success: true });
    } catch (error) {
        next(error)
    }
}

export const deleteOne: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({error: "Fields are missing"});
        }
        const myTask  = await Task.findById(id).exec();
        if (!myTask){
            return res.status(400).json({error: "Task doesn't exist"});
        }
        await myTask.delete();
        return res.json({success: true});
    } catch (error) {
        next(error)
    }
}

export const findOne: RequestHandler = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const myTask  = await Task.findById(id).exec();
        if (!myTask){
            return res.status(404).json({error: "Requested Task doesn't exist"});
        }
        return res.json({task: myTask});
    } catch (error) {
        next(error)
    }
}

export const taskErrorHandler:ErrorRequestHandler = (error, req, res, next)=>{
    if (error instanceof mongoose.Error.CastError && error.path === "_id") return res.status(400).json({error: "Invalid Id"});
    if (error instanceof mongoose.Error.ValidationError) return res.status(409).json({error: "Validation failed"});
    next(error)
}