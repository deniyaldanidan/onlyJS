import { Router } from "express";
import { createComment, deleteComment, likeCommentErrorHandler, likeController, updateComment } from "../../controllers/likeCommentController";
import verifyJWT from "../../middlewares/verifyJWT";



const likeCommentRouter:Router = Router();

likeCommentRouter.use(verifyJWT);

likeCommentRouter.post("/like", likeController);

likeCommentRouter.route("/comment")
    .post(createComment)
    .put(updateComment);

likeCommentRouter.delete("/comment/:id", deleteComment);

//* Error Handler middleware for this router
likeCommentRouter.use(likeCommentErrorHandler);

export default likeCommentRouter;