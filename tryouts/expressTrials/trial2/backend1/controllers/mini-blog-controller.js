const MiniBlog = require("../models/MiniBlog");

const getAllBlogs = async(req, res, next)=>{
    try {
        const mini_blogs = await MiniBlog.find({}).exec()
        return res.json(mini_blogs);
    } catch (error) {
        return next(error);
    }
}

const createBlog = async(req, res, next)=>{
    const {title, excerpt, body, author} = req.body;
    if (!title || !excerpt || !body || !author) return res.status(404).json({error: "some fields are missing"});
    try {
        if (await MiniBlog.findOne({title}).exec()) return res.status(409).json({errors: {title: "title already taken"}});
        const newMBlog = await MiniBlog.create({title, excerpt, body, author})
        console.log(newMBlog);
        return res.json({newMBlog}) 
    } catch (error) {
        return next(error)
    }
}

const updateBlog = async(req, res, next)=>{
    const {id, title, excerpt, body} = req.body;
    if (!id) return res.status(400).json({error: "id field is missing"});
    try {
        const mblog = await MiniBlog.findById(id).exec();
        if (!mblog) return res.status(404).json({error: "requested blog not found"});
        title && (mblog.title = title);
        excerpt && (mblog.excerpt = excerpt);
        body && (mblog.body = body);
        await mblog.save();
        return res.json({success: `Blog ${mblog.title} is updated`});
    } catch (error) {
        if (error.name==="MongoServerError" && error.code===11000){
            return res.status(409).json({errors: {title: "Title already taken"}});
        }
        return next(error);
    }

}

const deleteBlog = async(req, res, next)=>{
    const {id} = req.body;
    if (!id) return res.status(400).json({error: "id field is missing"});
    try {
        await MiniBlog.findByIdAndDelete(id).exec();
        return res.json({success: "blog is deleted"})
    } catch (error) {
        next(error)
    }
}

const getOneBlog = async (req, res, next)=>{
    const id = req.params.id;
    try {
        const mBlog = await MiniBlog.findById(id).exec();
        if (!mBlog) return res.status(404).json({error: "Blog not found"});
        return res.json(mBlog);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getOneBlog
}