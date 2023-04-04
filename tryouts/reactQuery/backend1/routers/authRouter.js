const {Router} = require('express');
const userRegisterController = require('../controllers/userRegisterController');

const authRouter = Router();

authRouter.post("/register", userRegisterController);

module.exports = authRouter;