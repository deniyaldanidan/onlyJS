import React from 'react';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './cards1.scss'
import {AiFillCaretRight, AiFillCaretLeft} from 'react-icons/ai';

const Cards1 = ()=>{
    return (
        <CarouselProvider
            totalSlides={5}
            naturalSlideWidth={850}
            naturalSlideHeight={400}
            className="carousel-container-1"
            currentSlide={3}
            orientation="vertical"
            infinite={true}
        >
            <Slider className="cards">
                <Slide index={0} className="card">
                    <div className="card-contents">
                        #1 Slide
                    </div>
                </Slide>
                <Slide index={1} className="card">
                    <div className="card-contents">
                        #2 Slide
                    </div>
                </Slide>
                <Slide index={2} className="card">
                    <div className="card-contents">
                        #3 Slide
                    </div>
                </Slide>
                <Slide index={3} className="card">
                    <div className="card-contents">
                        #4 Slide
                    </div>
                </Slide>
                <Slide index={4} className="card">
                    <div className="card-contents">
                        #5 Slide
                    </div>
                </Slide>
            </Slider>
            <ButtonBack className="prev"><AiFillCaretLeft/></ButtonBack>
            <ButtonNext className="next"><AiFillCaretRight/></ButtonNext>
        </CarouselProvider>
    )
}

export default Cards1;