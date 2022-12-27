import { Router } from "express";
import { getAllIdeas } from "../../controllers/IdeaController";


const ideaRouter = Router();


ideaRouter.get("/", getAllIdeas);


export default ideaRouter;