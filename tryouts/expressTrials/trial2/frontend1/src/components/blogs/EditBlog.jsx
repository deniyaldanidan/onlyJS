import { Navigate, useLocation } from 'react-router-dom';
import usePrivateApi from '../../hooks/usePrivateAPI';
import BlogForm from './BlogForm';

const EditBlog = () => {
    const privateApi  = usePrivateApi();
    const location = useLocation();
    const blogData = location?.state?.blog;
    const blogId = location?.state?.blog?._id;
    const backLink = `/blog/${blogId}`;

    const requestFunc = async ({title, excerpt, body})=>{
        try {
            const result  = await privateApi.put("/mini-blog", {id:blogId, title, excerpt, body})
            return result.data;
        } catch (error) {
            throw error
        }
    }

    return blogId ? <BlogForm initialTitle={blogData.title} initialExcerpt={blogData.excerpt} initialBody={blogData.body} edit successLink={backLink} cancelLink={backLink} requestFunc={requestFunc}  /> : <Navigate to="/links" replace />
}

export default EditBlog;