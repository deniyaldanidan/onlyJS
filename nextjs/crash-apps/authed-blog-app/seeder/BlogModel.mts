import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
    title: String,
    excerpt: String,
    body: String,
    author: String
})

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;