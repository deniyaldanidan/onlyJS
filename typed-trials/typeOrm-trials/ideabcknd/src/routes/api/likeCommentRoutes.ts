import { Router } from "express";
import { createComment, deleteComment, likeCommentErrorHandler, likeController, updateComment } from "../../controllers/likeCommentController";
import verifyJWT from "../../middlewares/verifyJWT";



const likeCommentRouter:Router = Router();

likeCommentRouter.post("/like", verifyJWT, likeController);

likeCommentRouter.route("/comment")
    .post(verifyJWT, createComment)
    .put(verifyJWT, updateComment);

likeCommentRouter.delete("/comment/:id", verifyJWT, deleteComment);

//* Error Handler middleware for this router
likeCommentRouter.use(likeCommentErrorHandler);

export default likeCommentRouter;