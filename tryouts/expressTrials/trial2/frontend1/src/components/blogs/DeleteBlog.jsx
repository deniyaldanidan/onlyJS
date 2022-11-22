import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usePrivateApi from "../../hooks/usePrivateAPI";
import { H2BTN } from "../../styledComponents/Btns";
import Wrapper from "../../styledComponents/Wrapper";

const DeleteBlog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [blog, setBlog] = useState({});
    const privateApi = usePrivateApi()

    useEffect(()=>{
        let blogData = location.state?.blog;
        !blogData && navigate("/links");
        setBlog(blogData)
    }, [location, navigate]);

    const deleteHandler = async()=>{
        try {
            const result = await privateApi.delete("/mini-blog", {data: {id:blog._id}});
            console.log(result);
            navigate("/blogs");
        } catch (error) {
            console.log(error);
        }
    }

    const cancelHandler = ()=>{
        navigate(`/blog/${blog._id}`)
    }

    return (
        <Wrapper>
            <h1>Do you want to delete "{blog.title}"?</h1>
            <div style={{ marginTop: "40px", marginBottom: "20px", display: "flex", justifyContent: "space-evenly" }}>
                <H2BTN onClick={deleteHandler}>Delete</H2BTN>
                <H2BTN onClick={cancelHandler}>Cancel</H2BTN>
            </div>
        </Wrapper>
    )
};

export default DeleteBlog;
