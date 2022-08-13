import React from 'react'
import {TiArrowRightOutline} from 'react-icons/ti';

const IllustrationShowcase = ({illustSrc, head, para, reverse=false}) => {
  return (
    <div className={`illustrations-section ${reverse ? "reverse-flex" : ""}`}>
        <div className="illust-cont-1">
            <div className="head">{head}</div>
            <div className='para'>{para}</div>
            <button>
                <span>
                    Learn more
                </span>
                <TiArrowRightOutline className='join-btn-icon'/>
            </button>
        </div>
        <div className="illust-cont-2">
            <img src={illustSrc} alt="" />
        </div>
    </div>
  )
}

export default IllustrationShowcase