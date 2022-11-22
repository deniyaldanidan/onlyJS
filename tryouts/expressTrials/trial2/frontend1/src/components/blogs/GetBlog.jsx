import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usePrivateApi from "../../hooks/usePrivateAPI";
import { H2BTN } from "../../styledComponents/Btns";
import Wrapper from "../../styledComponents/Wrapper";
import Blog from "./Blog";
import { BsPencilSquare, BsTrash, BsViewStacked } from 'react-icons/bs';
import useAuth from "../../context/AuthContext";

const GetBlog = () => {
    const [blog, setBlog] = useState({});
    const params = useParams();
    const privateApi = usePrivateApi();
    const {isAdmin, isEditor} = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getBlog = async () => {
            try {
                const response = await privateApi.get(`/mini-blog/${params.id}`, {
                    signal: controller.signal
                });
                isMounted && setBlog(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getBlog();
        return () => {
            isMounted = false;
            controller.abort()
        }
    }, [privateApi, params]);

    return (
        <Wrapper>
            {
                Object.values(blog).length && <Blog blog_data={blog} />
            }
            <div style={{ marginTop: "40px", marginBottom: "20px", display: "flex", justifyContent: "space-evenly" }}>
                {
                    Object.values(blog).length && (<>
                        { isEditor || isAdmin ? <H2BTN as={Link} to="/edit-blog" state={{blog}} ><BsPencilSquare /></H2BTN> : "" }
                        { isAdmin ? <H2BTN as={Link} to="/delete-blog" state={{blog}} ><BsTrash /></H2BTN> : ""}
                    </>)
                }
                <H2BTN as={Link} to="/blogs"><BsViewStacked /></H2BTN>
            </div>
        </Wrapper>
    )
}

export default GetBlog;