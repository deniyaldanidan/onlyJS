import { Router } from 'express';
import { createOne, deleteOne, findOne, getAll, taskErrorHandler, toggImp, updateOne } from '../controllers/taskControllers';

const taskRouter: Router = Router();

taskRouter.route("/")
    .get(getAll)
    .post(createOne)
    .put(updateOne)
    .delete(deleteOne);

taskRouter.put("/toggImp", toggImp);
taskRouter.get("/:id", findOne);

// Handling Known Errors and escaping unknown errors to Main-Handler
taskRouter.use(taskErrorHandler)


export default taskRouter;