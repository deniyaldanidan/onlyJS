import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Post from '../posts/Post'
import { selectPostsByUserId } from '../posts/postsSlice'
import ReactionButton from '../posts/ReactionButton'
import UserEl from './UserEl'
import { selectUserById } from './userSlice'

const User = () => {

    const params = useParams();
    const userId = parseInt(params.id)
    const user = useSelector(state=>selectUserById(state, userId))
    const myPosts = useSelector(state=>selectPostsByUserId(state, userId));
    
    const postMapper = (post, index)=>(
        <Link to={`/post/${post.id}`} key={index} className="post-box">
            <Post post={post} /> 
            <ReactionButton post={post} muted={true} />
        </Link>
    );

    return (
        <>
            <div className="user-showcase">
                <div className='user-view-h1'>Profile</div>
                <UserEl user={user}/>
            </div>
            <div className="user-view-h1">{user.name}'s Posts</div>
            <div className="posts">
                { myPosts.length ? myPosts.map(postMapper) : "No Posts yet."}
            </div>
        </>
    )
}

export default User