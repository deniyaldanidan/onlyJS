import React from 'react'
import Slider from 'react-slick';

const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 1500,
    easing: "ease-in-out"
}

const FooterBlogs = () => {
  return (
    <div className='footer-blogs'>     
    <Slider {...settings}>
        <div className='f-blog'>
            <div className='f-blog-head'>Marketing</div>
            <div className='f-blog-cont'>Making an Investor Pitch Deck</div>
        </div>
        <div className='f-blog'>
            <div className='f-blog-head'>Operational</div>
            <div className='f-blog-cont'>USA SaaS Events (and some more)</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head">Funding</div>
            <div className="f-blog-cont" >AG5 raises $1.2M from Peak to close the Skills gap</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head" >Operational</div>
            <div className="f-blog-cont" >USA SaaS Events (and some more)</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head" >Marketing</div>
            <div className="f-blog-cont" >Making an Investor Pitch Deck</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head" >Funding</div>
            <div className="f-blog-cont" >AG5 raises $1.2M from Peak to close the Skills gap</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head" >Marketing</div>
            <div className="f-blog-cont" >Making an Investor Pitch Deck</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head" >Funding</div>
            <div className="f-blog-cont" >AG5 raises $1.2M from Peak to close the Skills gap</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head" >Operational</div>
            <div className="f-blog-cont" >USA SaaS Events (and some more)</div>
        </div>
        <div className='f-blog'>
            <div className="f-blog-head" >Marketing</div>
            <div className="f-blog-cont" >Making an Investor Pitch Deck</div>
        </div>
    </Slider>
    </div>
  )
}

export default FooterBlogs