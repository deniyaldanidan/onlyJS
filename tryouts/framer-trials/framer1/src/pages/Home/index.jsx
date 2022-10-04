import React from 'react'
import CTA from './CTA';
import Features from './Features';
import Hero from './Hero';
import './home.scss';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <>
      <Hero/>
      <Features/>
      <Testimonials/>
      <CTA/>
      {/* <ShopCards/> */}
      {/* <BlogCards/> */}
      {/* <Newsletter/> */}
    </>
  )
}

export default Home;