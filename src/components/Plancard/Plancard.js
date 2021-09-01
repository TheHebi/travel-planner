import React from 'react';
import Moment from 'react-moment';

// LOCAL IMPORTS
import './Plancard.css';

export default function Plancard({ planData }) {
    return (
        <>
        {!planData ? (null) : (
            <div className="plan-card">
                <div className="plan-card-info-wrapper">
                    <h3>{planData.name}</h3>
                    <Moment format="MMM Do YYYY" date = {planData.date} />
                </div>
                <div className="plan-card-buttons-wrapper">
                    <button className="card-btn btn-left">
                        View Details
                    </button>
                    <button className="card-btn btn-right">
                        Opt-in
                    </button>
                </div>
            </div>
        )}
            
        </>
    )
}