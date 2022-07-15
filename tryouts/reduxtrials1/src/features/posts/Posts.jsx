import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Post from './Post';
import { selectPosts, fetchPosts } from './postsSlice';
import ReactionButton from './ReactionButton';

const Posts = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectPosts);
  const postsStatus = useSelector(state=>state.posts.status);
  const errorMessage = useSelector(state=>state.posts.error);

  useEffect(()=>{
    if (postsStatus === 'idle'){
      dispatch(fetchPosts());
    }
    // console.log(postsStatus)
  }, [dispatch, postsStatus])

  let myContent;

  if(postsStatus==="idle" || postsStatus==="loading"){
    myContent = "Loading"
  } else if (postsStatus==="succeeded"){
    const renderPosts = allPosts.map((post, index)=>(
      <Link to={`/post/${post.id}`} key={index} className="post-box" >
        <Post post={post} />
        <ReactionButton post={post} muted={true} />
      </Link>
    ));
    myContent = allPosts.length ? renderPosts : <div>No Posts</div>;
  } else if (postsStatus === "failed" && errorMessage){
    myContent = errorMessage
  }

  return (
    <div className='posts'>
      {myContent}
    </div>
  )
}

export default Posts