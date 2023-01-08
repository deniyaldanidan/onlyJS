import { Router } from "express";
import { fetchAllIdeas, fetchAllUser } from "../../controllers/fetchAllController";


const fetchAllRouter:Router = Router()

fetchAllRouter.get("/fetchAllIdeas", fetchAllIdeas);
fetchAllRouter.get("/fetchAllUsers", fetchAllUser);

export default fetchAllRouter;