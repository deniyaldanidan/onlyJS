"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskErrorHandler = exports.findOne = exports.deleteOne = exports.toggImp = exports.updateOne = exports.createOne = exports.getAll = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find({}).exec();
        return res.json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const createOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, important, due, note, tags } = req.body;
        if (!(name === null || name === void 0 ? void 0 : name.length)) {
            return res.status(400).json({ error: "Fields are missing" });
        }
        const newTask = yield Task_1.default.create({
            name,
            important,
            due: (typeof due === "string" && (due === null || due === void 0 ? void 0 : due.length)) ? due : undefined,
            note: (typeof note === "string" && (note === null || note === void 0 ? void 0 : note.length)) ? note : undefined,
            tags: (Array.isArray(tags) && (tags === null || tags === void 0 ? void 0 : tags.length)) ? tags : []
        });
        return res.json({ task: newTask, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.createOne = createOne;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, important, due, note, tags } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Id field is missing" });
        }
        const myTask = yield Task_1.default.findById(id).exec();
        if (!myTask) {
            return res.status(400).json({ error: "Task doesn't exist" });
        }
        (typeof name === "string" && (name === null || name === void 0 ? void 0 : name.length)) && (myTask.name = name);
        (typeof important === "boolean") && (myTask.important = important);
        (due === null || due === void 0 ? void 0 : due.length) && (myTask.due = due);
        (typeof note === "string" && (note === null || note === void 0 ? void 0 : note.length)) && (myTask.note = note);
        (Array.isArray(tags) && (tags === null || tags === void 0 ? void 0 : tags.length)) && (myTask.tags = tags);
        const updTask = yield myTask.save({ validateBeforeSave: true, });
        return res.json({ updatedTask: updTask, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOne = updateOne;
const toggImp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, important } = req.body;
        if (!id || typeof important !== "boolean") {
            return res.status(400).json({ error: "Fields are missing" });
        }
        const myTask = yield Task_1.default.findById(id).exec();
        if (!myTask) {
            return res.status(400).json({ error: "Task doesn't exist" });
        }
        myTask.important = important;
        const result = yield myTask.save({ validateBeforeSave: true });
        return res.json({ toggledTask: result, success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.toggImp = toggImp;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Fields are missing" });
        }
        const myTask = yield Task_1.default.findById(id).exec();
        if (!myTask) {
            return res.status(400).json({ error: "Task doesn't exist" });
        }
        yield myTask.delete();
        return res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOne = deleteOne;
const findOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const myTask = yield Task_1.default.findById(id).exec();
        if (!myTask) {
            return res.status(404).json({ error: "Requested Task doesn't exist" });
        }
        return res.json({ task: myTask });
    }
    catch (error) {
        next(error);
    }
});
exports.findOne = findOne;
const taskErrorHandler = (error, req, res, next) => {
    if (error instanceof mongoose_1.default.Error.CastError && error.path === "_id")
        return res.status(400).json({ error: "Invalid Id" });
    if (error instanceof mongoose_1.default.Error.ValidationError)
        return res.status(409).json({ error: "Validation failed" });
    next(error);
};
exports.taskErrorHandler = taskErrorHandler;
