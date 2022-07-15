import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

const Post = ({post}) => {

  return (
    <div className="post">
        <img src={`https://picsum.photos/seed/${post.id}/350/270`} alt="" />
        <div className="title">{post.title}</div>
        <div className="excerpt">{post.excerpt}</div>
        <div className="meta"><TimeAgo timeStamp={post?.date} /></div> 
        <div className='meta'><PostAuthor userId={post?.user} /></div>
    </div>
  )
}

export default Post