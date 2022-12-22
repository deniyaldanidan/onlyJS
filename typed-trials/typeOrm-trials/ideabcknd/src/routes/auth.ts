import {Router} from 'express';
import loginController from '../controllers/loginController';
import registerController from '../controllers/registerController';
import AuthErrorHandler from '../middlewares/AuthErrorHandler';

const authRouter = Router();


authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

authRouter.use(AuthErrorHandler);

export default authRouter;