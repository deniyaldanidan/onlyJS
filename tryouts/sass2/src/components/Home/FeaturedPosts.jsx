import React from 'react'
import Post1 from './Post1'
import { featured_posts } from './postsList'
import adPic from '../../assets/AZURE-TRUE-ad.png';

const FeaturedPosts = () => {
  return (
    <div className="featured-posts container-md">
        <div className="featured-intro">Featured posts</div>
        <div className="fposts-sec">
            {featured_posts.map(post=><Post1 key={post.title} pic={post.pic} title={post.title} excerpt={post.excerpt} date={post.date} views={post.views} tags={post.tags} />)}
            <img src={adPic} alt="" className='ad' />
        </div>
    </div>
  )
}

export default FeaturedPosts;