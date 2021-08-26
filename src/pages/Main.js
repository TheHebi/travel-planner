import React from 'react';

// LOCAL IMPORTS
import Homepage from '../components/Homepage/Homepage';
import Features from '../components/Features/Features';
import Trending from '../components/Trending/Trending';
import Contact from '../components/Contact/Contact';

export default function Main() {
    return (
        <div>
            <Homepage />
            <Features />
            <Trending />
            <Contact />
        </div>
    )
}