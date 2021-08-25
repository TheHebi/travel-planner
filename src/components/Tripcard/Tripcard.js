import React, { useState } from 'react';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Tripcard.css';

export default function Tripcard() {
    const [activeTab, setActiveTab] = useState('Overview')

    const handleTabSwitch = (e) => {
        e.preventDefault();
        // find active tab
        // remove trip-nav-active class
        // set state to e.target id
        console.log(e.target.id)
        setActiveTab(e.target.id)
        // give e.target trip-nav-active class
        console.log(activeTab)
    }

    return (
        <Container fluid className="trips-main">
            <Container>
                {/* <div className="trip-nav">
                    <div className="trip-nav-first-filler"></div>
                        <a className="trip-nav-item trip-nav-active" id="Overview" onClick={handleTabSwitch}>Overview</a>
                        <a className="trip-nav-item trip-nav-active-neighbor" id="Itinerary" onClick={handleTabSwitch}>Itinerary</a>
                        <a className="trip-nav-item" id="Budget" onClick={handleTabSwitch}>Budget</a>
                        <a className="trip-nav-item" id="Travelers" onClick={handleTabSwitch}>Travelers</a>
                    <div className="trip-nav-last-filler"></div>
                </div> */}
                <div className="trip-content">
                    pppppppp
                </div>
            </Container>
        </Container>
    )
}