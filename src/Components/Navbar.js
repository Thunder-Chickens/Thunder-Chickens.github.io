import React, { useState, useRef } from 'react';  // Added useRef
import './Navbar.css';
import logo from '../Images/logo.png';
import contact from '../Images/contact.png';
import eggImage from '../Images/egg.png';
import hatchedImage from '../Images/chick.png';
import chirpSound from '../Audio/chirp.mp3';  // Your chick chirp sound file
import { Link } from 'react-scroll';

const Navbar = () => {
    const [eggs, setEggs] = useState([]);
    const audioRef = useRef(new Audio(chirpSound));  // Pre-load the sound

    const handleLogoClick = () => {
        const id = Date.now();
        setEggs(prev => [...prev, { id, isHatched: false }]);

        setTimeout(() => {
            setEggs(prev => prev.filter(e => e.id !== id));
        }, 6000);
    };

    const handleEggClick = (id) => {
        // Check if it was an egg before hatching
        const wasEgg = eggs.find(e => e.id === id)?.isHatched === false;

        setEggs(prev => prev.map(e =>
            e.id === id ? { ...e, isHatched: true } : e
        ));

        // Play chirp only on the moment of hatching
        if (wasEgg) {
            audioRef.current.currentTime = 0;  // Rewind to start
            audioRef.current.play();
        }
    };

    return (
        <nav className="navbar">
            <div className="logo-wrapper">
                <img
                    src={logo}
                    alt="Thunder Chickens Logo"
                    className="logo"
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                />

                <div className="egg-container">
                    {eggs.map(egg => (
                        <div
                            key={egg.id}
                            className="dropping-egg"
                            onClick={() => !egg.isHatched && handleEggClick(egg.id)}
                        >
                            <img
                                src={egg.isHatched ? hatchedImage : eggImage}
                                alt="Falling egg"
                                className="egg-image"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="desktopMenu">
                <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={1000} className="desktopMenuListItem">Home</Link>
                <Link activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={1000} className="desktopMenuListItem">About</Link>
                <Link activeClass='active' to='people' spy={true} smooth={true} offset={-100} duration={1000} className="desktopMenuListItem">People</Link>
                <Link activeClass='active' to='galleryComp' spy={true} smooth={true} offset={-100} duration={1000} className="desktopMenuListItem">Gallery</Link>
            </div>

            <Link activeClass='active' to='footer' spy={true} smooth={true} offset={-100} duration={1000}>
                <button className="desktopMenuBtn">
                    <img src={contact} alt="contact" className="desktopMenuImg" />Contact Us
                </button>
            </Link>
        </nav>
    );
}

export default Navbar;