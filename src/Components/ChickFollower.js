import React, { useEffect, useRef, useState } from 'react';
import './ChickFollower.css';
import chickImage from '../Images/chick.png';
// "Electric Shock" from Wikimedia Commons (CC BY-SA 4.0), originally via freesounds:
// https://commons.wikimedia.org/wiki/File:Electric_Shock.ogg
import zapSound from '../Audio/zap.mp3';

const WALK_SPEED = 160;   // px per second
const ARRIVED = 6;        // close enough, stand still
const TURN_DISTANCE = 12; // only turn around for real horizontal movement
const ZAP_DURATION = 900; // ms the bolt stays on screen before the chick is gone

// Where a spot (stored as fractions of the image) actually sits on screen.
// The gallery uses object-fit: contain, so the picture can be letterboxed
// inside the <img> box; work out the drawn area first.
export const spotRect = (img, face) => {
    const box = img.getBoundingClientRect();
    if (!box.width || !img.naturalWidth) return null;   // hidden or not loaded

    const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const left = box.left + (box.width - w) / 2;
    const top = box.top + (box.height - h) / 2;

    return {
        left: left + face.x * w,
        top: top + face.y * h,
        right: left + (face.x + face.w) * w,
        bottom: top + (face.y + face.h) * h,
    };
};

// A jagged line from the top of the screen down to (x, y)
const boltPoints = (x, y) => {
    const points = [[x + (Math.random() - 0.5) * 120, 0]];
    const segments = 9;
    for (let i = 1; i < segments; i++) {
        const t = i / segments;
        points.push([x + (Math.random() - 0.5) * 70 * (1 - t), y * t]);
    }
    points.push([x, y]);
    return points.map(p => p.join(',')).join(' ');
};

const ChickFollower = ({ start, onGone }) => {
    const chickRef = useRef(null);
    const onGoneRef = useRef(onGone);
    onGoneRef.current = onGone;
    const [mode, setMode] = useState('idle');  // idle | walking
    const [facingLeft, setFacingLeft] = useState(false);
    const [zap, setZap] = useState(null);      // { x, y, points } once struck

    useEffect(() => {
        const pos = { ...start };
        const target = { ...start };
        let lastTime = performance.now();
        let frame;
        let goneTimer;

        const handleMove = (e) => {
            target.x = e.clientX;
            target.y = e.clientY + 50;  // stand just below the cursor
        };

        const steppedOnFace = () => {
            const img = document.querySelector('.active-anim img[data-zap-spot]');
            const chick = chickRef.current;
            if (!img || !chick) return null;
            const face = spotRect(img, JSON.parse(img.dataset.zapSpot));
            if (!face) return null;

            const feetY = pos.y + chick.offsetHeight / 2;
            const hit = pos.x >= face.left && pos.x <= face.right &&
                        feetY >= face.top && feetY <= face.bottom;
            return hit ? { img, face } : null;
        };

        const strike = ({ img, face }) => {
            window.removeEventListener('pointermove', handleMove);
            setMode('idle');
            // Always strike the middle of the face, wherever the chick stepped in
            const x = (face.left + face.right) / 2;
            const y = (face.top + face.bottom) / 2;
            setZap({ x, y, points: boltPoints(x, y) });
            const sfx = new Audio(zapSound);
            sfx.volume = 0.6;
            sfx.play().catch(() => {});   // sound is a bonus; ignore autoplay blocks

            img.classList.remove('zapped');
            void img.offsetWidth;            // restart the animation if it's mid-play
            img.classList.add('zapped');
            img.addEventListener('animationend', () => img.classList.remove('zapped'), { once: true });

            goneTimer = setTimeout(() => onGoneRef.current?.(), ZAP_DURATION);
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

            const hit = steppedOnFace();
            if (hit) {
                strike(hit);     // stop walking for good
                return;
            }
            frame = requestAnimationFrame(tick);
        };

        window.addEventListener('pointermove', handleMove);
        frame = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            cancelAnimationFrame(frame);
            clearTimeout(goneTimer);
        };
    }, [start]);

    return (
        <>
            <div className={`chick-follower ${zap ? 'poof' : ''}`} ref={chickRef} aria-hidden="true">
                <div className={`chick-body ${mode}`}>
                    <img
                        src={chickImage}
                        alt=""
                        className={`chick-sprite ${facingLeft ? 'facing-left' : ''}`}
                    />
                </div>
            </div>

            {zap && (
                <>
                    <div className="zap-flash" aria-hidden="true" />
                    <svg className="zap-bolt" aria-hidden="true">
                        <polyline className="zap-glow" points={zap.points} />
                        <polyline className="zap-core" points={zap.points} />
                        <circle className="zap-burst" cx={zap.x} cy={zap.y} r="28" />
                    </svg>
                </>
            )}
        </>
    );
};

export default ChickFollower;
