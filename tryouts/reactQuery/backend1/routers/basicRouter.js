const {Router}  = require('express');
const {getAllIdeas, createIdea} = require('../controllers/ideaControllers');

const basicRouter = Router();

basicRouter.get("/", getAllIdeas);
basicRouter.post("/", createIdea);

module.exports =  basicRouter;