import { Router } from "express";
import { profileErrorHandler, profileView, updateProfile } from "../../controllers/profileController";
import verifyJWT from "../../middlewares/verifyJWT";


const profileRouter:Router = Router();

profileRouter.use(verifyJWT);

profileRouter.route("/")
    .get(profileView)
    .put(updateProfile);

profileRouter.use(profileErrorHandler);


export default profileRouter;