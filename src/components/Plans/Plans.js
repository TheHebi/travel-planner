import React, { useState } from 'react';

// LOCAL IMPORTS
import './Plans.css';
import Plancard from '../Plancard/Plancard.js';

export default function Plantab({ planData }) {
    const [viewAllPlans, setViewAllPlans] = useState(true)

    return (
        <>
        {!planData ? (null) : (
            <div className="plan-wrapper-super">
                <button className="add-plan-button">
                    Add an Item
                </button>
                <div className="plan-cards-wrapper">
                    {planData.map((plan, i) => <Plancard key={i} planData={plan} />)}
                </div>
            </div>
        )}
        </>
        
    )
}