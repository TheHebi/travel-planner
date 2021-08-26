import React, { useState, useEffect } from 'react';


// FONTAWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Homepage.css';

export default function Homepage() {
    // states
    // Navbar height: (124px)
    const [mainHeight, setMainHeight] = useState(window.innerHeight);

    // set height
    useEffect(() => {
        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            setMainHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    }, [mainHeight])


    return (
        <div className="home-main" style={{ height: mainHeight }}>
            <h1 className="text-light">Message to Customer</h1>
            <h3 className="text-light">Message to Customer</h3>
            <a href="/trips">
                <button className="mt-3 home-main-button text-light">
                    Get Started
                    <FontAwesomeIcon icon={faPlaneDeparture} size='1x' className="ms-2" />
                </button>
            </a>
            <a href="/#features" className="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
        </div>
    )
}