const express = require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog, getOneBlog } = require('../controllers/mini-blog-controller');
const mongoose = require('mongoose');
const handleValidationError = require('../helpers/handleValidationError');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');
const ROLES_LIST = require('../config/ROLES_LIST');

const router = express.Router();

router.use(verifyJWT);

router.route("/")
    .get(verifyRoles(ROLES_LIST.User), getAllBlogs)
    .post(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), createBlog)
    .put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), updateBlog)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteBlog)

router.get("/:id", verifyRoles(ROLES_LIST.User), getOneBlog);

// handling known errors
router.use((error, req, res, next)=>{
    if (error instanceof mongoose.Error.CastError && error.path === "_id") return res.status(400).json({error: "Invalid Id"});
    if (error instanceof mongoose.Error.ValidationError) return res.status(409).json({errors: handleValidationError(error)});
    next(error)
})

module.exports = router;