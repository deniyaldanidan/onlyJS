import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DeleteForm from './DeleteForm';
import Post from './Post';
import { selectPostById, deletePost } from './postsSlice';
import ReactionButton from './ReactionButton';


const PostView = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postId = parseInt(params.id);
    const post = useSelector(state=>selectPostById(state, postId));
    const [show, setShow] = useState(false);


    const handleDelete = ()=>{
        dispatch(deletePost(postId))
        navigate("/");
    }

    return (
        <>
            {post?.id ? (<div className='post-view-opts'>
                <Link to={`/post/edit/${post.id}`} className="post-view-link">Edit Post</Link>
                <button className="post-view-link" onClick={()=>setShow(true)} >Delete Post</button>
            </div>) : <></>}
            <div className='post-view'>
                {post ?  (
                <>
                    <Post post={post} />
                    <ReactionButton post={post} />
                </>
                )  : <h3>No Such Post Existed</h3>}
            </div>
            { show && <DeleteForm closePort={()=>setShow(false)} postName={post?.title} submitHandler={handleDelete} /> }
        </>
    )
}

export default PostView