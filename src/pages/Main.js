import React from 'react';

// LOCAL IMPORTS
import Homepage from '../components/Homepage/Homepage';
import Features from '../components/Features/Features';
import Contact from '../components/Contact/Contact';
import Recommendation from '../components/Recommendation/Recommendation';

export default function Main() {

    return (
        <div>
            <Homepage/>
            <Features />
            <Recommendation />
            <Contact />
        </div>
    )
}