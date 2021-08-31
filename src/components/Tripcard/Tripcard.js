import React, { useState, createRef } from 'react';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Tripcard.css';
import Budget from '../Budget/Budget.js';
import Lounge from '../Lounge/Lounge.js';
import Tripoverview from '../Tripoverview/Tripoverview.js';

export default function Tripcard({ tripData, budgetData, user, token }) {
    // SET REFERENCE, STATES FOR TAB SWITCHING
    // ---------------------------------------
    const [activeTab, setActiveTab] = useState('Overview')
    const overviewRef=createRef();
    const itineraryRef=createRef();
    const budgetRef=createRef();
    const loungeRef=createRef();

    // HANDLE TAB SWITCHING
    const handleTabSwitch = (e) => {
        e.preventDefault();
        
        // set all classlists to just tab
        overviewRef.current.className = "trip-nav-item";
        itineraryRef.current.className = "trip-nav-item";
        budgetRef.current.className = "trip-nav-item";
        loungeRef.current.className = "trip-nav-item";

        // set target to active
        e.target.classList.add('trip-nav-active');
        setActiveTab(e.target.id)
    }

    // RENDER APPROPRIATE CONTENT
    const renderTab = () => {
        if (!activeTab) {
            return <Tripoverview trip={tripData} />
        } else if (activeTab === 'Overview') {
            return <Tripoverview trip={tripData} />
        } else if (activeTab === 'Itinerary') {
            return (
                <div>
                    <h1>Itinerary</h1>
                </div>
            )
        } else if (activeTab === 'Budget') {
            return (
                <div>
                    <h1>Budget</h1>
                    <Budget budgetData={budgetData} user={user} token={token} />
                </div>
            )
        } else if (activeTab === 'Lounge') {
            return (
                <div>
                    <h1>Travel Lounge</h1>
                    <Lounge messages={tripData.Comments} travellers={tripData.SavedUser} user={user} token={token} />
                </div>
            )
        }
    }
    
    return (
        <Container fluid className="trips-main">
            <Container>
                <div className="trip-nav">
                    {/* <div className="trip-nav-first-filler"></div> */}
                    <button className="trip-nav-item trip-nav-active" id="Overview" onClick={handleTabSwitch} ref={overviewRef}>Overview</button>
                    <button className="trip-nav-item" id="Itinerary" onClick={handleTabSwitch} ref={itineraryRef}>Itinerary</button>
                    <button className="trip-nav-item" id="Budget" onClick={handleTabSwitch} ref={budgetRef}>Budget</button>
                    <button className="trip-nav-item" id="Lounge" onClick={handleTabSwitch} ref={loungeRef}>Lounge</button>
                    {/* <div className="trip-nav-last-filler"></div> */}
                </div>
                <div className="trip-content">
                    {renderTab()}
                </div>
            </Container>
        </Container>
    )
}