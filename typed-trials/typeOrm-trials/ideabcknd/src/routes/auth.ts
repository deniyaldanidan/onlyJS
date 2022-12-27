import {Router} from 'express';
import loginController from '../controllers/loginController';
import logoutController from '../controllers/logoutController';
import refreshController from '../controllers/refreshController';
import registerController from '../controllers/registerController';
import AuthErrorHandler from '../middlewares/AuthErrorHandler';

const authRouter = Router();


authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/logout", logoutController);
authRouter.get("/refresh", refreshController);

authRouter.use(AuthErrorHandler);

export default authRouter;