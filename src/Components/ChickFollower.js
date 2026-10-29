import React, { useEffect, useRef, useState } from 'react';
import './ChickFollower.css';
import chickImage from '../Images/chick.png';

const WALK_SPEED = 160;   // px per second
const ARRIVED = 6;        // close enough, stand still
const TURN_DISTANCE = 12; // only turn around for real horizontal movement

const ChickFollower = ({ start }) => {
    const chickRef = useRef(null);
    const [mode, setMode] = useState('idle');  // idle | walking
    const [facingLeft, setFacingLeft] = useState(false);

    useEffect(() => {
        const pos = { ...start };
        const target = { ...start };
        let lastTime = performance.now();
        let frame;

        const handleMove = (e) => {
            target.x = e.clientX;
            target.y = e.clientY + 50;  // stand just below the cursor
        };

        const tick = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            const dx = target.x - pos.x;
            const dy = target.y - pos.y;
            const dist = Math.hypot(dx, dy);

            if (dist > ARRIVED) {
                const step = Math.min(WALK_SPEED * dt, dist);
                pos.x += (dx / dist) * step;
                pos.y += (dy / dist) * step;
                setMode('walking');
            } else {
                setMode('idle');
            }

            if (Math.abs(dx) > TURN_DISTANCE) setFacingLeft(dx < 0);

            if (chickRef.current) {
                chickRef.current.style.transform =
                    `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
            }
            frame = requestAnimationFrame(tick);
        };

        window.addEventListener('pointermove', handleMove);
        frame = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            cancelAnimationFrame(frame);
        };
    }, [start]);

    return (
        <div className="chick-follower" ref={chickRef} aria-hidden="true">
            <div className={`chick-body ${mode}`}>
                <img
                    src={chickImage}
                    alt=""
                    className={`chick-sprite ${facingLeft ? 'facing-left' : ''}`}
                />
            </div>
        </div>
    );
};

export default ChickFollower;
