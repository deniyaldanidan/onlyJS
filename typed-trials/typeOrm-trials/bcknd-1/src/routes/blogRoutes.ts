import {Router} from 'express';
import { blogErrorHandler, createBlog, deleteBlog, findBlog, getAllBlogs, updateBlog } from '../controllers/blogController';

const blogRouter = Router();

blogRouter.route("/")
    .get(getAllBlogs)
    .post(createBlog)
    .put(updateBlog)

blogRouter.route("/:id")
    .get(findBlog)
    .delete(deleteBlog)

blogRouter.use(blogErrorHandler);


export default blogRouter;