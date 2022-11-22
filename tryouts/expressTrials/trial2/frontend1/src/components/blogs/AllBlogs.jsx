import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePrivateApi from "../../hooks/usePrivateAPI"
import { H2BTN } from "../../styledComponents/Btns";
import Wrapper from "../../styledComponents/Wrapper";
import Blog from "./Blog";


const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const privateApi = usePrivateApi();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getBlogs = async () => {
            try {
                const response = await privateApi.get("/mini-blog", {
                    signal: controller.signal
                });
                isMounted && setBlogs(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getBlogs();
        return ()=>{
            isMounted=false;
            controller.abort()
        }
    }, [privateApi])

    return (
        <Wrapper>
            <h1>All Blogs</h1>
            <div style={{margin:"50px 0"}}>
                {
                    blogs?.length ? blogs.map(blog=><Blog key={blog.title} showCase={true} blog_data={blog} />) : ""
                }
            </div>
            <H2BTN as={Link} to="/links">To LinksPage</H2BTN>
        </Wrapper>
    )
}

export default AllBlogs