"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskControllers_1 = require("../controllers/taskControllers");
const taskRouter = (0, express_1.Router)();
taskRouter.route("/")
    .get(taskControllers_1.getAll)
    .post(taskControllers_1.createOne)
    .put(taskControllers_1.updateOne)
    .delete(taskControllers_1.deleteOne);
taskRouter.put("/toggImp", taskControllers_1.toggImp);
taskRouter.get("/:id", taskControllers_1.findOne);
taskRouter.use(taskControllers_1.taskErrorHandler);
exports.default = taskRouter;
