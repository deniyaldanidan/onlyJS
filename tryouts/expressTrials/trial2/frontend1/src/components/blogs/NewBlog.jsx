import usePrivateApi from '../../hooks/usePrivateAPI';
import BlogForm from './BlogForm';

const NewBlog = () => {
    const privateApi  = usePrivateApi();

    const requestFunc = async ({title, excerpt, author, body})=>{
        try {
            const result  = await privateApi.post("/mini-blog", {title, excerpt, author, body})
            console.log(result.data);
            return result.data
        } catch (error) {
            throw error;
        }
    }

    const backLink = `/blogs`;

    return <BlogForm successLink={backLink} cancelLink={backLink} requestFunc={requestFunc} />
}

export default NewBlog;