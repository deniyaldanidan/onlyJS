import { Router } from "express";
import { createIdea, deleteIdea, getAllIdeas, getOneIdea, ideaErrorHandler, updateIdea } from "../../controllers/IdeaController";
import verifyJWT from "../../middlewares/verifyJWT";


const ideaRouter = Router();

ideaRouter.route("/")
    .get(getAllIdeas)
    .post(verifyJWT, createIdea)
    .put(verifyJWT, updateIdea);

ideaRouter.route("/:id")
    .get(getOneIdea)
    .delete(verifyJWT, deleteIdea);


ideaRouter.use(ideaErrorHandler);

export default ideaRouter;