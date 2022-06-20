import React from 'react'

const Post = ({post}, ref) => {
  return (
    <div ref={ref} className="post-card">
        <div className="post-title">{post.id}. {post.title}</div>
        <div className="post-body">{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className='post-body'>{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className="post-body">{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className='post-body'>{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className="post-body">{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className='post-body'>{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className="post-body">{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className='post-body'>{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className="post-body">{post.body}{post.body}{post.body}{post.body}{post.body}</div>
        <div className='post-body'>{post.body}{post.body}{post.body}{post.body}{post.body}</div>
    </div>
  )
}

export default React.forwardRef(Post);