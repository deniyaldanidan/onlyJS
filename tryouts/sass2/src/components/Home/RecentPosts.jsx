import React from 'react'
import Post2 from './Post2'
import { recent_posts } from './postsList'

const RecentPosts = () => {
  return (
    <div className='recent-posts'>
        <div className="container-md">
            <div className="recent-p-intro">Recent posts</div>
            <div className="recent-p-posts">
                {recent_posts.map(post=><Post2 key={post.title} title={post.title} img={post.pic} excerpt={post.excerpt} author={post.author} date={post.date} />)}
            </div>
        </div>
    </div>
  )
}

export default RecentPosts