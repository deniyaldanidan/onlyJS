import { Router } from "express";
import { createIdea, deleteIdea, getAllIdeas, getOneIdea, updateIdea } from "../../controllers/IdeaController";


const ideaRouter = Router();


ideaRouter.get("/", getAllIdeas);
ideaRouter.post("/", createIdea);
ideaRouter.put("/", updateIdea);
ideaRouter.get("/:id", getOneIdea);
ideaRouter.delete("/:id", deleteIdea);


export default ideaRouter;