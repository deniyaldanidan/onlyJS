import { useNavigate } from "react-router-dom"

const Blog = ({ blog_data, showCase = false }) => {

    const navigate = useNavigate()

    const handleClick=()=>{
        showCase && navigate(`/blog/${blog_data._id}`)
    }

    return (
        <div className={`blog-card ${showCase ? "blog-click" : ''}`} onClick={handleClick}>
            <div className="blog-title">{blog_data.title}</div>
            <div className="blog-excerpt">{blog_data.excerpt}</div>
            <div className="blog-author">by {blog_data.author}</div>
            {!showCase ? <div className="blog-body">{blog_data.body}</div> : ""}
        </div>
    )
}

export default Blog;