import React from 'react'
import LogoCard from '../tools/LogoCard';
import '../../styles/logo-card.scss';
import Slider from 'react-slick';
import logos from '../../data/logosList';


// custom arrows for the slider

const NextArrow = ({className, onClick})=>{
  return (
    <div 
      className={`${className} cust-next-arrow`} 
      onClick={onClick}
    
    >
      <div><span></span></div>
    </div>
    );
  }
  
const PrevArrow = ({className, onClick})=>{
  return (
    <div 
      className={`${className} cust-prev-arrow`} 
      onClick={onClick}
    >
      <div>
        <span></span>
      </div>
    </div>
  );
}
    
const settings = {
  dots:false,
  infinite:true,
  // centerMode: true,
  className:"",
  speed:500,
  slidesToShow: 3.95,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  nextArrow: <NextArrow/>,
  prevArrow: <PrevArrow/>,
  responsive: [
    {
      breakpoint: 1430,
      settings: {
        slidesToShow: 3.75
      }
    },
    {
      breakpoint: 1363,
      settings: {
        slidesToShow: 3.5
      }
    },
    {
      breakpoint: 1285,
      settings: {
        slidesToShow: 3.25
      }
    },
    {
      breakpoint: 1175,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 2.75
      }
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 2.45
      }
    },
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 2.15
      }
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 1.85
      }
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 1.5
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1
      }
    },
  ]
}

const LogoSlider = () => {
  return (
    <div className='logo-slider-cont'>
        <Slider {...settings}>
            {
                logos.map(curr=><LogoCard logosrc={curr.logo} logoname={curr.name} key={curr.name} />)
            }
        </Slider>
    </div>
  )
}

export default LogoSlider;