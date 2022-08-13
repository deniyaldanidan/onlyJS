import React from 'react'
import {VscCalendar} from 'react-icons/vsc';
import {FaRegEye} from 'react-icons/fa';
import {BsTags} from 'react-icons/bs';

const Post1 = ({pic, title, excerpt, date, views, tags}) => {
  return (
    <div className="article-card-1">
        <img src={pic} alt={title} />
        <div className="article-contents">
            <a className="title" href='/'>{title}</a>
            <div className="excerpt">{excerpt}</div>
            <div className="metas">
                <div className="meta">
                    <VscCalendar className='meta-icon'/>
                    <span>
                        {date}
                    </span>
                </div>
                <div className="meta">
                    <FaRegEye className="meta-icon" />
                    <span>
                        {views}
                    </span>
                </div>
                <div className="meta">
                    <BsTags className='meta-icon' />
                    <span>
                        {tags.map((tag, index, array)=><><a href='/'>{tag}</a>{(array.length!==index+1)?", ":""}</>)}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post1