import React from 'react';
import { useState, useRef } from 'react';
import ChickFollower, { spotRect } from './ChickFollower';
import chirpSound from '../Audio/chirp.mp3';
import {Link} from 'react-scroll'; 
import './Gallery.css';
import dataSlider from './dataSlider';
import BtnSlider from './BtnSlider'; 


function VideoContainer({ isActive, src, type }) {
    const { useState, useRef, useEffect } = React; 
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) return;
        if (!isActive) {
        ref.current.pause();
        }
    }, [isActive]);

    return (
        <video controls ref={ref}>
        <source src={src} type={type} />
        </video>
    );
}

const Gallery = () => {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if (slideIndex != dataSlider.length) {
            setSlideIndex(slideIndex+1); 
        }
        else if (slideIndex === dataSlider.length) {
            setSlideIndex(1); 
        }
    }
    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex-1);
        }
        else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length); 
        }
    }
    const moveDot = index => {
        setSlideIndex(index);
    }

    // Easter egg: click the hatch spot on a photo and a chick hatches there and follows the cursor
    const [chickStart, setChickStart] = useState(null);
    const chirpRef = useRef(null);

    const tryHatch = (e, spot) => {
        if (chickStart) return;   // one chick at a time
        const r = spotRect(e.currentTarget, spot);
        if (!r || e.clientX < r.left || e.clientX > r.right ||
            e.clientY < r.top || e.clientY > r.bottom) return;

        if (!chirpRef.current) chirpRef.current = new Audio(chirpSound);
        chirpRef.current.currentTime = 0;
        chirpRef.current.play().catch(() => {});
        setChickStart({ x: e.clientX, y: e.clientY });
    }

    return (
        <section id="galleryComp">
            <div className="galleryTitle">Photo Gallery</div>

            <div className="gallery">
                <div className="container-slider">
                    {dataSlider.map((obj, index) => {
                        return (
                            <div key={obj.id} className={slideIndex === index + 1? "slide active-anim" : "nothing"}>
                                {/*<img src={process.env.PUBLIC_URL + '/Images/img${index+1}.jpg'}></img>*/}
                                {obj.type ? 
                                    (<img
                                        src={obj.img}
                                        alt={obj.title}
                                        data-zap-spot={obj.zapSpot ? JSON.stringify(obj.zapSpot) : undefined}
                                        onClick={obj.hatchSpot ? (e) => tryHatch(e, obj.hatchSpot) : undefined}
                                    />
                                    ) : 
                                    (<VideoContainer src={obj.vid} type="video/mp4" isActive={slideIndex === index + 1} />)
                                }
                            </div>
                        )
                    })}
                    <BtnSlider moveSlide={nextSlide} direction={"next"}></BtnSlider>
                    <BtnSlider moveSlide={prevSlide} direction={"prev"}></BtnSlider>
                    <div className="container-dots">
                        {dataSlider.map((obj, index) => 
                            (<div key={obj.id} onClick={() => moveDot(index + 1)}
                                className={slideIndex === index + 1 ? "dot active" : "dot"}>
                            </div>))}
                    </div>
                </div>  
                <div className="imageText">
                    {dataSlider.map((obj, index) => {
                        return (
                            <div key={obj.id} className={slideIndex === index + 1? "text" : "nothing"}>
                                <div key={obj.id} className="imgTitle">
                                    {obj.title} 
                                </div>
                                <div key={obj.id} className="imgText">
                                    {obj.text} 
                                </div>
                            </div>
                        ); 
                    })}
                </div>
            </div>
            {chickStart && <ChickFollower start={chickStart} onGone={() => setChickStart(null)} />}
        </section>
    ); 
}

export default Gallery; 

{/*<video width="750" height="500" controls >
<source src={b4la} type="video/mp4"/>
</video>*/}