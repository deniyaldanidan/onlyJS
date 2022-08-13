import React from 'react'
import {VscCalendar} from 'react-icons/vsc';

const Post2 = ({title, img, excerpt, author, date}) => {
  return (
    <div className="article-card-2">
        <img src={img} alt={title} />
        <div className="article-contents article-contents-2">
            <div className="title">{title}</div>
            <div className="excerpt">{excerpt}</div>
            <div className="metas">
                <div className="meta">
                    <img src={`https://i.pravatar.cc/150?u=${author}`} alt={author} className="meta-author-pic" />
                    <span>
                        <a href='/'>By, {author}</a>
                    </span>
                </div>
                <div className="meta">
                    <VscCalendar className='meta-icon' />
                    <span>{date}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post2