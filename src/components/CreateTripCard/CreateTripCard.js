import React, { useState } from 'react';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Tripcard.css';

export default function CreateTripCard() {
    <Container fluid className="trips-main">
        <Container>
            <div className="trip-nav">
                <div className="trip-nav-first-filler"></div>
                <button className="trip-nav-item trip-nav-active" id="Overview" onClick={handleTabSwitch}>Overview</button>
                <button className="trip-nav-item trip-nav-active-neighbor" id="Itinerary" onClick={handleTabSwitch}>Itinerary</button>
                <button className="trip-nav-item" id="Budget" onClick={handleTabSwitch}>Budget</button>
                <button className="trip-nav-item" id="Lounge" onClick={handleTabSwitch}>Lounge</button>
                <div className="trip-nav-last-filler"></div>
            </div>
            <div className="trip-content">
                {activeTab === 'Overview' &&
                    <div>
                        <h1>Paris 08/12/21 - 09/02/21</h1>
                    </div>
                }
                {activeTab === 'Itinerary' &&
                    <div>
                        <h1>Itinerary</h1>
                    </div>
                }
                {activeTab === 'Budget' &&
                    <div>
                        <h1>Budget</h1>
                        <Budget budget={budget} />
                    </div>
                }
                {activeTab === 'Lounge' &&
                    <div>
                        <h1>Travel Lounge</h1>
                        <Lounge />
                    </div>
                }
            </div>
        </Container>
    </Container>
}