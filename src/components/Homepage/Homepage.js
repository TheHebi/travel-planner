import React, { useState, useEffect } from 'react';

// FONTAWESOME IMPORTS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

// LOCAL IMPORTS
import './Homepage.css';

export default function Homepage() {
    // states
    // For the time being, just manually deletes navbar height (109px)
    const [mainHeight, setMainHeight] = useState(window.innerHeight - 109);

    // set height
    useEffect(() => {
        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            setMainHeight(window.innerHeight - 109)
        }
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    }, [mainHeight])

    
    return (
        <div className="home-main" style={{ height: mainHeight }}>
            <h1>Message to Customer</h1>
            <h3>Message to Customer</h3>
            <button className="mt-3 home-main-button">
                Get Started
                <FontAwesomeIcon icon={faPlaneDeparture} size='1x' className="ms-2" />
            </button>
        </div>
    )
}