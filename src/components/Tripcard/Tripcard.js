import React, { useState, useEffect } from 'react';
import api from '../../utils/api.js';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Tripcard.css';
import Budget from '../Budget/Budget.js';
import Lounge from '../Lounge/Lounge.js';
import Tripoverview from '../Tripoverview/Tripoverview.js';

export default function Tripcard() {
    const [activeTab, setActiveTab] = useState(null)
    const [tripData, setTripData] = useState('')

    const handleTabSwitch = (e) => {
        e.preventDefault();

        if (activeTab) {
            activeTab.classList.remove('trip-nav-active')
        }
        console.log(activeTab)
        e.target.classList.add('trip-nav-active');
        setActiveTab(e.target)
    }

    const renderTab = () => {
        if (!activeTab) {
            return <Tripoverview trip={tripData} />
        } else if (activeTab.id === 'Overview') {
            return <Tripoverview trip={tripData} />
        } else if (activeTab.id === 'Itinerary') {
            return (
                <div>
                    <h1>Itinerary</h1>
                </div>
            )
        } else if (activeTab.id === 'Budget') {
            return (
                <div>
                    <h1>Budget</h1>
                    <Budget budget={budget} />
                </div>
            )
        } else if (activeTab.id === 'Lounge') {
            return (
                <div>
                    <h1>Travel Lounge</h1>
                    <Lounge messages={tripData.Comments} travellers={tripData.SavedUser} />
                </div>
            )
        }
    }

    useEffect(() => {
        api.getSingleTrip('2').then(res => {setTripData(res.data)});
    }, [])

    // temporary data
    const budget = {
        budget: 5000,
        budgetCategories: [
            {
                title: 'Travel',
                items: [
                    {
                        name: 'Plane Ticket',
                        price: 845,
                    },
                    {
                        name: 'Eurorail Pass',
                        price: 120,
                    }
                ]
            },
            {
                title: 'Food',
                items: [
                    {
                        name: 'Various foodstuffs',
                        price: 350
                    },
                    {
                        name: 'This is an extremely long name for testing purposes',
                        price: 10
                    }
                ]
            },
            {
                title: 'Lodging',
                items: [
                    {
                        name: 'AirBNB',
                        price: 1200
                    }
                ]
            },
            {
                title: 'An Extremely Long Title',
                items: [
                    {
                        name: 'Example',
                        price: 760
                    }
                ]
            }
        ]
    }

    return (
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
                    {renderTab()}
                </div>
            </Container>
        </Container>
    )
}