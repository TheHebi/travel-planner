import React, { useState, createRef } from 'react';

// BOOTSTRAP IMPORTS
import Container from 'react-bootstrap/Container';

// LOCAL IMPORTS
import './Tripcard.css';
import Budget from '../Budget/Budget.js';
import Lounge from '../Lounge/Lounge.js';
import Tripoverview from '../Tripoverview/Tripoverview.js';
import Plantab from '../Plans/Plans.js';

export default function Tripcard(props) {
    // SET REFERENCE, STATES FOR TAB SWITCHING
    // ---------------------------------------
    const [activeTab, setActiveTab] = useState('Overview')
    const overviewRef=createRef();
    const plansRef=createRef();
    const budgetRef=createRef();
    const loungeRef=createRef();

    // HANDLE TAB SWITCHING
    const handleTabSwitch = (e) => {
        e.preventDefault();
        
        // set all classlists to just tab
        overviewRef.current.className = "trip-nav-item";
        plansRef.current.className = "trip-nav-item";
        budgetRef.current.className = "trip-nav-item";
        loungeRef.current.className = "trip-nav-item";

        // set target to active
        e.target.classList.add('trip-nav-active');
        setActiveTab(e.target.id)
    }

    // HANDLE ADDING USER TO TRIP
    const userAddHandler = (tripId, userId) => {
        props.handleUserAdd(tripId, userId);
    }
    
    // RENDER APPROPRIATE CONTENT
    const renderTab = () => {
        if (!activeTab) {
            return <Tripoverview trip={props.tripData} />
        } else if (activeTab === 'Overview') {
            return <Tripoverview trip={props.tripData} />
        } else if (activeTab === 'Plans') {
            return (
                <div>
                    <h1>Plans</h1>
                    <Plantab
                        planData={props.tripData.Plans}
                        user={props.user}
                        token={props.token}

                        handlePlanCreate={props.handlePlanAdd}
                    />
                </div>
            )
        } else if (activeTab === 'Budget') {
            return (
                <div>
                    <h1>Budget</h1>
                    <Budget
                        budgetData={props.budgetData}
                        changeTotal={props.changeBudgetTotal}
                        user={props.user}
                        token={props.token}
                    />
                </div>
            )
        } else if (activeTab === 'Lounge') {
            return (
                <div>
                    <h1>Travel Lounge</h1>
                    <Lounge
                        messages={props.tripData.Comments}
                        travellers={props.tripData.SavedUser}
                        creator={props.tripData.User}
                        handleUserAddition={userAddHandler}
                        user={props.user}
                        token={props.token} />
                </div>
            )
        }
    }
    
    return (
        <Container fluid className="trips-main">
            <Container>
                <div className="trip-nav">
                    <button className="trip-nav-item trip-nav-active" id="Overview" onClick={handleTabSwitch} ref={overviewRef}>Overview</button>
                    <button className="trip-nav-item" id="Plans" onClick={handleTabSwitch} ref={plansRef}>Plans</button>
                    <button className="trip-nav-item" id="Budget" onClick={handleTabSwitch} ref={budgetRef}>Budget</button>
                    <button className="trip-nav-item" id="Lounge" onClick={handleTabSwitch} ref={loungeRef}>Lounge</button>
                </div>
                <div className="trip-content">
                    {renderTab()}
                </div>
            </Container>
        </Container>
    )
}